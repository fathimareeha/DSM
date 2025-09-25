import React, { useEffect, useState } from "react";
import axios from "axios";

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/superadmin_app/create_coupon", {
        headers: { Authorization: `Token ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/superadmin_app/delete_coupon/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      // Update state (remove deleted coupon)
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    } catch (err) {
      console.error("Error deleting coupon:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading coupons...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Coupons List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Discount Type</th>
              <th className="py-2 px-4 border-b">Value</th>
              <th className="py-2 px-4 border-b">From Package</th>
              <th className="py-2 px-4 border-b">To Package</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">{coupon.code}</td>
                <td className="py-2 px-4 border-b capitalize">{coupon.discount_type}</td>
                <td className="py-2 px-4 border-b">
                  {coupon.discount_type === "fixed"
                    ? `₹${coupon.discount_value}`
                    : `${coupon.discount_value}%`}
                </td>
                <td className="py-2 px-4 border-b text-center">{coupon.from_package_name} ({coupon.from_package_type})</td>
                <td className="py-2 px-4 border-b text-center">{coupon.to_package_name} ({coupon.to_package_type})</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CouponList;
