import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/super_admin/Breadcrumbs';


function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function Details() {
  const { institution_id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [paymentDetails,setPaymentDetails] =useState('')

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/superadmin_app/institution_detail/${institution_id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setInstitution(res.data);

        const paymentres = await axios.get(`http://127.0.0.1:8000/superadmin_app/institution_payment/${institution_id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPaymentDetails(paymentres.data);

      } catch (error) {
        console.error("Error fetching institution details:", error);

         if (error.response && error.response.status === 404) {
    setPaymentDetails({
      is_paid: false,
      payment_status: "trial_expired",
      package: 'N/A',
      
      amount: 0,
      end_date: null
    });
  }
      }
    };

    fetchInstitutionDetails();
  }, [institution_id]);

  if (!institution) return <div>Loading...</div>;
  return (
    <div>
      <Breadcrumbs />
      <div className="bg-gray-100 py-10 px-4 flex justify-center">
        <div className="bg-white w-full p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">Institution Details</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage the details of the institution.</p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">General Information</h2>
            <div className="divide-y divide-gray-200 border rounded-md">
              <InfoRow label="Institution Name" value={
    institution.type === 'school'
      ? institution.school_name
      : institution.college_name
  } />
              <InfoRow label="Username" value={institution.username}/>
              <InfoRow label="Email" value={institution.email}/>
              <InfoRow label="Registration Id" value={institution.registration_id}/>
              <InfoRow label="Address 1" value={institution.address1 || 'N/A'} />
              <InfoRow label= 'Address 2' value={institution.address2 }/>
              <InfoRow label="State" value={institution.state}/>
              <InfoRow label="District" value={institution.district}/>
              <InfoRow label="Location" value={institution.location || 'N/A'} />
              <InfoRow label="Creation Date" value={institution.created_date} />
              <InfoRow label="Phone Number" value={institution.phone_number}/>
              <InfoRow label="Landline number" value={institution.landline_number}/>
              <InfoRow label="Activation Date" value={institution.activation_date || 'N/A'} />
              <InfoRow label="Type" value={institution.type} />
              <InfoRow label="Status" value={institution.is_active ? 'Active' : 'Inactive'} />
            </div>
          </div>

        <div className="mt-10">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
<div className="divide-y divide-gray-200 border rounded-md">
  <InfoRow label="Package" value={paymentDetails.package} />
  <InfoRow label="Amount" value={paymentDetails.original_price} />

  {paymentDetails && (
    <InfoRow
      label="Payment Status"
      value={
        paymentDetails.is_paid ? (
          <span className="badge bg-success">Paid</span>
        ) : paymentDetails.payment_status === "trial" ? (
          <span className="badge bg-warning text-dark">Trial</span>
        ) : paymentDetails.payment_status === "trial_expired" ? (
          <span className="badge bg-secondary">Trial Expired</span>
        ) : (
          <span className="badge bg-danger">Not Paid</span>
        )
      }
    />
  )}

  {paymentDetails.is_paid && (
    <InfoRow label="End Date" value={paymentDetails.end_date} />
  )}

  {/* ✅ Show Upgrade History (loop through all upgrades) */}
  {paymentDetails.upgrade_history &&
    paymentDetails.upgrade_history.length > 0 && (
      <div className="p-2">
        <h4 className="font-semibold text-gray-700 mb-2">Upgrade History</h4>
        {paymentDetails.upgrade_history.map((upgrade, index) => (
          <div key={index} className="mb-2  pb-2">
            <InfoRow label="Upgraded From" value={upgrade.old_package} />
            <InfoRow label="Upgraded To" value={upgrade.new_package} />
            <InfoRow label="Upgrade Amount" value={upgrade.paid_amount} />
            <InfoRow label="Upgrade Date" value={upgrade.date} />
          </div>
        ))}
      </div>
    )}
</div>
</div></div>
      </div>
    </div>
  );
}
export default Details;
