import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuperadminContext } from '../../context/super_admin/Superadmin_Context';

function Payment_option() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const token = localStorage.getItem('token');
  const navigate=useNavigate()

  const {handle_package}=useContext(SuperadminContext)
    const handle_submit=(e)=>{
    handle_package(selectedPackage)
      e.preventDefault()
    }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/superadmin_app/list_package', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch packages');
        }
        return res.json();
      })
      .then((data) => {
        setPackages(data);
      })
      .catch((err) => {
        console.error('Error fetching packages:', err);
      });
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <h1 className='flex justify-center text-3xl mb-5'>Payment</h1>
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {Array.isArray(packages) && packages.map((pkg) => (
        <div
          key={pkg.id}
          onClick={() => setSelectedPackage(pkg.id)}
          className={`rounded-xl border p-4 shadow-md cursor-pointer transition duration-300 ${
            selectedPackage === pkg.id ? 'border-blue-500 ring-2 ring-blue-300' : 'hover:shadow-lg'
          }`}
        >
          <h2 className="text-xl font-bold capitalize mb-2">{pkg.package}</h2>
          <p className="font-semibold text-gray-700">{pkg.plan_type}</p>
          <p className="text-gray-500 mb-2">{pkg.description}</p>
          <p className="text-green-600 font-semibold mb-2">₹ {pkg.price}</p>
        </div>
      ))}
      
    </div>
    <div className='flex justify-center '>
      <button onClick={()=>handle_submit()} className='border bg-blue-900 py-2 px-5 text-white'>Payment</button>
      </div>
      </div>
  );
}

export default Payment_option;
