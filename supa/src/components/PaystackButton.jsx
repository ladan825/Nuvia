import React from "react";
import { PaystackButton } from "react-paystack";

const PaystackPaymentButton = ({ email, amount }) => {
  const publicKey = "pk_test_ac53eace9d0ca99774c7f391e962fd5a28a751ce"; // Replace with your real Paystack public key

  const componentProps = {
    email,
    amount: amount * 100, // Amount in kobo
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "name",
          value: "Drink Nuiva User" // Optional, change dynamically if needed
        }
      ]
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (response) => {
      console.log(response);
      alert("Payment Successful! Reference: " + response.reference);
      // TODO: Save to DB or redirect user
    },
    onClose: () => alert("Payment Cancelled"),
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPaymentButton;
