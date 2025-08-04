import React, { useContext, useState } from 'react'
import Input from '../Input'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function Create_packages() {
  const [institution_type,setInstitutionType]=useState('')
  const [planPackage,setPlanPackage]=useState('')
  const [plan_type,setPlan_type]=useState('')
  const [description,setDescription]=useState('')
  const [price,SetPrice]=useState('')
  const [features, setSelectedFeatures] = useState([]);

const schoolFeatures = ["Attendance", "Homework", "Parent Portal"];
const collegeFeatures = ["Credits", "Semester System", "Library Access"];
const availableFeatures =
  institution_type === 'school' ? schoolFeatures :
  institution_type === 'college' ? collegeFeatures :
  [];

  const {create_packages}=useContext(SuperadminContext)

  
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFeatures([...features, value]);
    } else {
      setSelectedFeatures(features.filter((feature) => feature !== value));
    }
  };

      const handle_submit =  (e) => {
       

        
        create_packages(institution_type,planPackage,plan_type,description,features,price);
        console.log({institution_type, planPackage, plan_type, description,features, price});
        e.preventDefault();
      };
      
  return (
    <div className="mt-7 flex items-center justify-center px-4">
    
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg ">
        <h1 className="text-2xl font-bold text-center mb-6">Packages</h1>
        <form onSubmit={handle_submit} action="" className='space-y-3'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
             <div className="flex flex-col">
              <label className=" font-semibold">Institution</label>
          <select value={institution_type} onChange={(e) => setInstitutionType(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"  required>
            <option value="" disabled >Select a institution type</option>
            <option value="school">School</option>
            <option value="college">College</option>
            
          </select>
          </div>
          <div className="flex flex-col">
              <label className=" font-semibold">Packages</label>
          <select value={planPackage} onChange={(e) => setPlanPackage(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"  required>
            <option value="" disabled >Select a package</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          </div>
          <div className="flex flex-col">
              <label className=" font-semibold">Plan</label>
          <select value={plan_type} onChange={(e) => setPlan_type(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none" required>
            <option value="" disabled >Select a plan</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          </div>
          </div>
          <div>
          <label htmlFor="" className='font-semibold'>Description</label>
          
          <textarea onChange={(e) => setDescription(e.target.value)} className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"></textarea>
          </div>
          <div className="mb-4">
  <h4 className="text-lg font-semibold mb-2">Select Features:</h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {availableFeatures.map((feature, index) => (
      <label
        key={index}
        className="flex items-center space-x-2 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 transition"
      >
        <input
          type="checkbox"
          value={feature}
          checked={features.includes(feature)}
          onChange={handleFeatureChange}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="text-sm text-gray-800">{feature}</span>
      </label>
    ))}
  </div>
</div>

          <Input   label='Price' onChange={(e) => SetPrice(e.target.value)} type='number' placeholder='enter price' required={true}/>
          
          <div className='flex justify-center'>
            <button type="submit"
            className=" px-7 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-200">Create</button>
          </div>
        </form>

        
    </div></div>
  )
}

export default Create_packages