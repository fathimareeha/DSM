import React from 'react';
import Breadcrumbs from '../../components/super_admin/Breadcrumbs';

function Details() {
  return (
    <div>
    <Breadcrumbs/>
    <div className=" bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white w-full  p-8 rounded-xl shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">Institution Details</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage the details of the institution.</p>

        {/* General Information */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">General Information</h2>
          <div className="divide-y divide-gray-200 border rounded-md">
            <InfoRow label="Institution Name" value="Acme University" />
            <InfoRow label="Address" value="123 University Ave, Cityville, State, 12345" />
            <InfoRow label="Location" value="Cityville, State" />
            <InfoRow label="Creation Date" value="January 15, 2020" />
            <InfoRow label="Activation Date" value="February 20, 2020" />
            <InfoRow label="Type" value="University" />
            <InfoRow label="Status" value="Active" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
          <div className="divide-y divide-gray-200 border rounded-md">
            
            <InfoRow label="Payment Date" value="10.06.2025" />
            <InfoRow label="Due Date" value="10.07.2025" />
          </div>
        </div>
      </div>
    </div></div>
  );
}

// Reusable row component
const InfoRow = ({ label, value }) => (
  <div className="grid grid-cols-3 px-4 py-3 text-sm">
    <div className="col-span-1 text-gray-600 font-medium">{label}</div>
    <div className="col-span-2 text-gray-800">{value}</div>
  </div>
);


export default Details;
