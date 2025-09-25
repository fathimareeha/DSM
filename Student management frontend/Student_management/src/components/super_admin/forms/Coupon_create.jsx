import React, { useState, useEffect } from "react";
import axios from "axios";

function CouponForm() {
  const [formData, setFormData] = useState({
    code: "",
    discount_type: "fixed",
    discount_value: "",
    from_package: "",
    to_package: "",
    active: true,
  });

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/superadmin_app/create_package",
          { headers: { Authorization: `Token ${token}` } }
        );
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err.response?.data || err.message);
      }
    };

    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/superadmin_app/create_coupon",
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      alert("🎉 Coupon created successfully!");
      setFormData({
        code: "",
        discount_type: "fixed",
        discount_value: "",
        from_package: "",
        to_package: "",
        active: true,
      });
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Error creating coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Create Coupon
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Coupon Code */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Coupon Code</label>
          <input
            name="code"
            value={formData.code}
            placeholder="Enter coupon code"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Discount Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Discount Type</label>
          <select
            name="discount_type"
            value={formData.discount_type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="fixed">Fixed Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Discount Value</label>
          <input
            name="discount_value"
            value={formData.discount_value}
            placeholder="Enter discount value"
            type="number"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* From Package */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">From Package</label>
          <select
            name="from_package"
            value={formData.from_package}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="">-- Select From Package --</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.package} ({pkg.institution_type})
              </option>
            ))}
          </select>
        </div>

        {/* To Package */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">To Package</label>
          <select
            name="to_package"
            value={formData.to_package}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="">-- Select To Package --</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.package} ({pkg.institution_type})
              </option>
            ))}
          </select>
        </div>

       

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
}

export default CouponForm;
