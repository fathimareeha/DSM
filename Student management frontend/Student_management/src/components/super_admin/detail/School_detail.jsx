import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';



function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function School_detail() {
  const { institution_id } = useParams();
  console.log("id=",institution_id)
  const [institution, setInstitution] = useState(null);
  const [paymentDetails,setPaymentDetails] =useState({})

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/superadmin_app/school_list_update_institution/${institution_id}/`, {
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
        console.log("Payment Details:", paymentres.data);

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

    fetchSchoolDetails();
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
              <InfoRow label="Institution Name" value={institution.school_name} />
             <InfoRow label="Registration Id" value={institution.registration_id}/>
              <InfoRow label="Address 1" value={institution.address1 || 'N/A'} />
              <InfoRow label= 'Address 2' value={institution.address2 }/>
              <InfoRow label="State" value={institution.state}/>
              <InfoRow label="District" value={institution.district}/>
              <InfoRow label="Location" value={institution.location || 'N/A'} />
              <InfoRow label="Creation Date" value={institution.created_date} />
              <InfoRow label="Phone Number" value={institution.phone_number}/>
              <InfoRow label="School Type" value={institution.school_type}/>
              <InfoRow label="Board" value={institution.board}/>
              <InfoRow label="Landline number" value={institution.landline_number}/>
              <InfoRow label="Activation Date" value={institution.activation_date || 'N/A'} />
              
              <InfoRow label="Status" value={institution.is_active ? 'Active' : 'Inactive'} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
            <div className="divide-y divide-gray-200 border rounded-md">
              <InfoRow label="Package" value={paymentDetails.package}/>
         
              <InfoRow label="Amount" value={paymentDetails.amount}/>
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
                  <InfoRow label="End Date" value={paymentDetails.end_date} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default School_detail;
