import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Packages_list() {
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem('token');
  const navigate=useNavigate()

  const handleAddClick=()=>{
    navigate('/admin/create_package')
  }
  const handleEdit=(id)=>{
    navigate(`/admin/package_edit/${id}`)
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/superadmin_app/create_package', {
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
         <div className='flex justify-between items-center px-4 pt-4 mb-5'>
    <h1 className='text-3xl font-bold'>Available Packages</h1>
    <button className=' text-black px-4 py-2 rounded shadow' onClick={handleAddClick}>
      +Create
    </button>
  </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {Array.isArray(packages) && packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-xl border p-4 shadow-md transition duration-300 bg-white"
          >
            <h2 className="text-xl font-bold capitalize mb-2">{pkg.institution_type}</h2>
            <h2 className="text-xl font-bold capitalize mb-2">{pkg.package}</h2>
            <p className="font-semibold text-gray-700">{pkg.plan_type}</p>
            <p className="text-gray-500 mb-2">{pkg.description}</p>
            <p className="text-green-600 font-semibold mb-2">₹ {pkg.price}</p>
            <div className='flex justify-end'>
            <button className='text-red-700' onClick={()=>handleEdit(pkg.id)}>Edit</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages_list;
