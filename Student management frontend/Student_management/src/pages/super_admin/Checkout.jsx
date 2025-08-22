import React, { useContext, useEffect } from 'react';
import { SuperadminContext } from '../../context/super_admin/Superadmin_Context';
import axios from "axios"

const RazorpayPayment = ({ razorpayKey, amount, orderId }) => {
  const { order_details } = useContext(SuperadminContext)
  console.log("order_details:", order_details);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_1GToET5GDSxcq2', // e.g., 'rzp_test_abc123'
      amount: order_details.amount, // e.g., '50000' for ₹500.00
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order_details.id, // Order ID from your backend
      
      // handler: function (response) {
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature);
      // },
      handler: async function (response) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://127.0.0.1:8000/superadmin_app/payment_verify/${order_details.package_id}/`,
      {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        amount: order_details.amount // amount in paise
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("Payment Verified:", res.data);
    // Navigate or show success message here
  } catch (err) {
    console.error("Payment Verification Failed:", err);
    // Optionally show error to user
  }
},


          
      
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="bg-blue-900 text-white px-4 py-2 rounded">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayPayment;
