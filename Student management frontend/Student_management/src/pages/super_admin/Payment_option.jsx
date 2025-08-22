import React, { useEffect, useState, useContext } from 'react';
import { SuperadminContext } from '../../context/super_admin/Superadmin_Context';
import axios from 'axios';

function PaymentOption() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [upgradeInfo, setUpgradeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handle_package } = useContext(SuperadminContext);
  const token = localStorage.getItem('token');

  // Fetch all packages
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/superadmin_app/list_package', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setPackages(res.data))
      .catch((err) => console.error('Error fetching packages:', err));
  }, []);

  // Fetch upgrade info whenever a package is selected
  useEffect(() => {
    if (!selectedPackage) return;

    setLoading(true);
    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/subscription/upgrade-preview/${selectedPackage}/`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setUpgradeInfo(res.data))
      .catch((err) => console.error('Error fetching upgrade info:', err))
      .finally(() => setLoading(false));
  }, [selectedPackage]);

  const handlePaymentClick = async () => {
  if (!selectedPackage) return alert('Please select a package.');
  if (upgradeInfo?.amount_to_pay <= 0)
    return alert('Cannot upgrade to same or lower package.');

  // Pass both package ID and amount_to_pay to context
  await handle_package(selectedPackage, upgradeInfo.amount_to_pay);
};

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-5">Select Package</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`rounded-xl border p-4 shadow-md cursor-pointer transition duration-300 ${
              selectedPackage === pkg.id
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'hover:shadow-lg'
            }`}
          >
            <h2 className="text-xl font-bold mb-1">{pkg.institution_type}</h2>
            <h2 className="text-xl font-bold mb-1">{pkg.package}</h2>
            <p className="text-gray-700">{pkg.plan_type}</p>
            <p className="text-gray-500 mb-2">{pkg.description}</p>
            <p className="text-green-600 font-semibold mb-2">₹ {pkg.price}</p>
          </div>
        ))}
      </div>

      {selectedPackage && upgradeInfo && (
        <div className="mt-6 p-4 bg-white rounded shadow text-center">
          {loading ? (
            <p>Loading...</p>
          ) : upgradeInfo.is_upgrade ? (
            <p className="text-blue-700 font-semibold">
              Upgrade from <strong>{upgradeInfo.old_package}</strong> to{' '}
              <strong>{upgradeInfo.new_package}</strong>:{' '}
              <strong>₹ {upgradeInfo.amount_to_pay}</strong>
            </p>
          ) : (
            <p className="text-green-700 font-semibold">
              New subscription: <strong>₹ {upgradeInfo.amount_to_pay}</strong>
            </p>
          )}

          <button
            onClick={handlePaymentClick}
            className="mt-3 bg-blue-900 text-white py-2 px-5 rounded hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentOption;
