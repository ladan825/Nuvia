import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SuccessPage() {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('ref');
    const [status, setStatus] = useState('Verifying Payment...');
    const [isVerified, setIsVerified] = useState(false);
    // State to hold the final message from the backend
    const [backendMessage, setBackendMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!reference) {
                setStatus('Error: No payment reference found.');
                return;
            }

            // Retrieve pending order data from localStorage
            const pendingData = JSON.parse(localStorage.getItem('pendingOrderData'));
            if (!pendingData) {
                setStatus('Error: Order details lost. Contact support with your payment reference.');
                return;
            }

            setStatus('Sending verification request...');
            const { data: rawData, error } = await supabase.functions.invoke('verify-paystack-payment', {
                body: JSON.stringify({ 
                    reference,
                    orderData: pendingData
                }),
            });

            if (error) {
                console.error("Function error:", error);
                setStatus('Verification Failed (Supabase Function Error). Contact support.');
                return;
            }
            
            // --- CRITICAL FIX START ---
            let responseData;
            try {
                // Supabase sometimes returns the body as a raw string (if the function uses Deno.serve)
                // We attempt to parse it if it's a string.
                responseData = (typeof rawData === 'string') ? JSON.parse(rawData) : rawData;
            } catch (e) {
                console.error("Failed to parse function response:", rawData, e);
                setStatus('Verification Failed: Malformed response from server. Contact support.');
                return;
            }
            // --- CRITICAL FIX END ---
            
            // Ensure status check is robust
            if (responseData && responseData.status === 'success') {
                setStatus('Payment successfully verified and order saved!');
                setBackendMessage(responseData.message || 'Order placed successfully.');
                setIsVerified(true);
                
                // ✅ CART MANAGEMENT: Clear data after successful verification
                localStorage.removeItem('pendingOrderData'); 
                localStorage.removeItem('cart'); // Assuming your cart is stored under 'cart'
                
            } else {
                // If the backend ran but returned an error status (e.g., Paystack failed)
                const errorMessage = responseData ? responseData.message : 'Payment verification failed.';
                setStatus(`Verification Failed: ${errorMessage}`);
                
                // Important: Do NOT clear pending data or cart on failure
                // Prompt user to contact support with the reference
                setBackendMessage(`Please contact support immediately with your payment reference: ${reference}`);
            }
        };

        verifyPayment();
    }, [reference]);

    return (
        <div className="text-center p-10 pt-50">
            <h1 className="text-3xl font-bold mb-4">
                {isVerified ? 'Order Confirmed!' : status}
            </h1>
            
            {/* Display status or specific message */}
            <p className="text-lg mb-4">
                {isVerified ? backendMessage : status}
            </p>

            {isVerified && (
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-green-800">Your order has been securely placed. Check your email for the confirmation receipt. Your cart has been cleared.</p>
                </div>
            )}
            
            {!isVerified && (
                <div className="bg-red-100 p-4 rounded-lg">
                    <p className="text-red-800">Please do not close this window. If the error persists, use your reference **{reference}** to contact support immediately.</p>
                </div>
            )}
        </div>
    );
}