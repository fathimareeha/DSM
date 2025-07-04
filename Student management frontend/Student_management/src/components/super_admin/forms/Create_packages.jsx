import React, { useContext, useState } from 'react'
import Input from '../Input'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function Create_packages() {

  const [planPackage,setPlanPackage]=useState('')
  const [plan_type,setPlan_type]=useState('')
  const [description,setDescription]=useState('')
  const [price,SetPrice]=useState('')

  const {create_packages}=useContext(SuperadminContext)
      const handle_submit =  (e) => {
        
        create_packages(planPackage,plan_type,description,price);
        console.log({ planPackage, plan_type, description, price });
        e.preventDefault();
      };
  
  return (
    <div className="mt-7 flex items-center justify-center px-4">
    
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg ">
        <h1 className="text-2xl font-bold text-center mb-6">Packages</h1>
        <form onSubmit={handle_submit} action="" className='space-y-3'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className="flex flex-col">
              <label className=" font-semibold">Packages</label>
          <select value={planPackage} onChange={(e) => setPlanPackage(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"  required>
            <option value="" disabled selected>Select a package</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          </div>
          <div className="flex flex-col">
              <label className=" font-semibold">Plan</label>
          <select value={plan_type} onChange={(e) => setPlan_type(e.target.value)} name="" id="" className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none" required>
            <option value="" disabled selected>Select a plan</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          </div>
          </div>
          <div>
          <label htmlFor="" className='font-semibold'>Description</label>
          
          <textarea onChange={(e) => setDescription(e.target.value)} className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"></textarea>
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