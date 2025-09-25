import React, { useContext, useEffect } from 'react';
import { SuperadminContext } from '../../context/super_admin/Superadmin_Context';
import axios from "axios";

const RazorpayPayment = () => {
  const { order_details } = useContext(SuperadminContext);
  console.log("order_details:", order_details);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = () => {
    if (!order_details) return alert("Order details missing!");

    // Ensure amount_to_pay exists and is number
    const amountToPay = order_details.amount_to_pay || order_details.amount;
    const finalAmountPaise = parseInt(amountToPay * 100);

    const options = {
      key: 'rzp_test_1GToET5GDSxcq2',
      amount: finalAmountPaise,
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Subscription Payment',
      order_id: order_details.id,
      handler: async function (response) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(
            `http://127.0.0.1:8000/superadmin_app/payment_verify/${order_details.package_id}/`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amountToPay, // send final discounted amount
              package_id: order_details.package_id,
              coupon_code: order_details.coupon_code || null
            },
            { headers: { Authorization: `Token ${token}` } }
          );
          console.log("Payment Verified:", res.data);
        } catch (err) {
          console.error("Payment Verification Failed:", err);
        }
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000'
      },
      notes: { address: 'Razorpay Corporate Office' },
      theme: { color: '#3399cc' }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert(`Payment Failed: ${response.error.description}`);
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
