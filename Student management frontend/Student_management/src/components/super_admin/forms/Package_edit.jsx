import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Input';
import axios from 'axios';

function Package_edit() {
  const { id } = useParams();  // get package ID from URL
  const navigate = useNavigate();
 const [institution_type,setInstitutionType]=useState('')
  const [planPackage, setPlanPackage] = useState('');
  const [plan_type, setPlan_type] = useState('');
  const [description, setDescription] = useState('');
   const [features, setSelectedFeatures] = useState([]);
  const [price, setPrice] = useState('');

  const token = localStorage.getItem('token');
  const availableFeatures = [
    'SMS Notification',
    'Email Support',
    'Custom Branding',
    'Multi-user Access',
    'Priority Support',
    
  ];

   
  // Fetch package data on mount
  useEffect(() => {
      console.log("Editing package with ID:", id);

    axios.get(`http://127.0.0.1:8000/superadmin_app/update_retrieve_package/${id}`, {
      headers: { Authorization: `Token ${token}` }
    }).then((res) => {
      const data = res.data;
      setInstitutionType(data.institution_type)
      setPlanPackage(data.planPackage);
      setPlan_type(data.plan_type);
      setDescription(data.description);
      setSelectedFeatures(data.features)
      setPrice(data.price);
    }).catch(err => {
      console.error('Failed to fetch package:', err);
    });
  }, [id]);

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFeatures([...features, value]);
    } else {
      setSelectedFeatures(features.filter((feature) => feature !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/superadmin_app/update_retrieve_package/${id}`, {
        institution_type,
        package: planPackage,
        plan_type,
        description,
        features,
        price,
      }, {
        headers: { Authorization: `Token ${token}` }
      });
      navigate('/admin/list_package');  // Navigate back to package list
    } catch (err) {
      console.error('Failed to update package:', err);
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg ">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Package</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
             <div className="flex flex-col">
              <label className=" font-semibold">Institution</label>
          <select value={institution_type} onChange={(e) => setInstitutionType(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"  required>
            <option value="" disabled selected>Select a institution type</option>
            <option value="school">School</option>
            <option value="college">College</option>
            
          </select>
          </div>
            <div className="flex flex-col">
              <label className="font-semibold">Packages</label>
              <select
                value={planPackage}
                onChange={(e) => setPlanPackage(e.target.value)}
                className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                required
              >
                <option value="" disabled>Select a package</option>
                <option value="standard">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Plan</label>
              <select
                value={plan_type}
                onChange={(e) => setPlan_type(e.target.value)}
                className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                required
              >
                <option value="" disabled>Select a plan</option>

                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
              required
            ></textarea>
          </div>
          <div>
           <h4>Select Features:</h4>
      {availableFeatures.map((feature, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={feature}
            checked={features.includes(feature)}
            onChange={handleFeatureChange}
          />
          {feature}
        </label>
       
      ))} </div>

          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required={true}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-7 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-200" 
            >
              Update
            </button>
          </div>
        </form>
      </div>
      </div>
  );
}

export default Package_edit;
