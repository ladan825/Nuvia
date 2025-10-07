// Import external NPM modules using the Deno 'npm:' specifier
import { createClient } from 'npm:@supabase/supabase-js';
import { Resend } from 'npm:resend';

// Use the default Deno server to handle the incoming request
Deno.serve(async (req) => {
    // Set headers for a proper JSON response AND CORS preflight
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // IMPORTANT for development/CORS
        'Access-Control-Allow-Methods': 'POST, OPTIONS', // Must list allowed methods
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', // Must list headers sent by client
    };

    // --- CRITICAL FIX: Handle CORS Preflight (OPTIONS) Request ---
    // The browser sends an OPTIONS request first. It has no body, so we must
    // return an immediate 200 OK response with the correct headers.
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers });
    }
    // -----------------------------------------------------------------

    try {
        const { reference, orderData } = await req.json();

        if (!reference || !orderData) {
            return new Response(JSON.stringify({
                status: "error",
                message: "Missing reference or orderData"
            }), { status: 400, headers });
        }

        console.log("🔎 Verifying Paystack reference:", reference);

        // --- 1. VERIFY PAYMENT WITH PAYSTACK ---
        const paystackSecret = Deno.env.get("PAYSTACK_SECRET");
        if (!paystackSecret) {
            console.error("❌ PAYSTACK_SECRET is missing.");
            return new Response(JSON.stringify({
                status: "error",
                message: "PAYSTACK_SECRET is not configured"
            }), { status: 500, headers });
        }

        const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${paystackSecret}`,
                "Content-Type": "application/json"
            }
        });

        const verifyData = await verifyResponse.json();
        console.log("✅ Paystack verify response:", verifyData);

        // Check if Paystack confirms the success
        if (!verifyData.data || verifyData.data.status !== "success") {
            return new Response(JSON.stringify({
                status: "error",
                message: "Payment verification failed on Paystack",
                raw: verifyData
            }), { status: 400, headers });
        }

        // --- 2. SAVE ORDER TO SUPABASE using Service Role Key ---
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const serviceKey = Deno.env.get("SERVICE_ROLE_KEY");

        if (!supabaseUrl || !serviceKey) {
            console.error("❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY.");
            return new Response(JSON.stringify({
                status: "error",
                message: "Supabase credentials not configured"
            }), { status: 500, headers });
        }

        // Initialize Supabase Client with Service Role Key (Bypasses RLS)
        const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
            auth: { persistSession: false },
        });

        const { error: saveError } = await supabaseAdmin
            .from('Orders')
            .insert({
                ...orderData,
                payment_reference: reference,
                status: "paid"
            })
            .select();

        if (saveError) {
            console.error("❌ Supabase Order Save Failed:", saveError);
            return new Response(JSON.stringify({
                status: "error",
                message: "Order save failed in Supabase",
                raw: saveError.message || saveError.details
            }), { status: 500, headers });
        }

        console.log("✅ Order saved successfully in Supabase.");

        // --- 3. SEND CONFIRMATION EMAIL (Optional but recommended) ---
        const resendKey = Deno.env.get("RESEND_API_KEY");
        if (resendKey) {
            try {
                const resend = new Resend(resendKey);
                
                await resend.emails.send({
                    from: 'Your Shop Name <onboarding@your-verified-domain.com>', // MUST be verified!
                    to: [orderData.customer_email],
                    subject: `Order Confirmation (Ref: ${reference})`,
                    html: `
                        <h1>Thank You for Your Order!</h1>
                        <p>Your payment of ₦${orderData.total_amount} has been successfully verified.</p>
                        <p>Order details have been saved. We will notify you when your items are ready to ship.</p>
                        <br/>
                        <p>— The Team</p>
                    `,
                });
                console.log("📧 Confirmation email sent successfully.");

            } catch (emailError) {
                console.error("❌ Failed to send confirmation email:", emailError);
                // NOTE: We continue with success, as the order is saved.
            }
        } else {
            console.warn("⚠️ RESEND_API_KEY is missing. Email notification skipped.");
        }

        // --- 4. RETURN SUCCESS ---
        return new Response(JSON.stringify({
            status: "success",
            message: "Verified, Saved & Notified"
        }), { status: 200, headers });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        return new Response(JSON.stringify({
            status: "error",
            message: "Server error",
            details: error.message || String(error)
        }), { status: 500, headers });
    }
});