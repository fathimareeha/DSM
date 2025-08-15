import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { Authcontext } from '../../context/institution/Authcontext';
import { Loader } from 'lucide-react';


function AddDepartment() {
  const {department_create} = useContext(Authcontext)
  const [name,setname] = useState("")
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    {/* <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2> */}

    <div className="space-y-4">
      <Inputfield label={'name'} onchange={(e)=>setname(e.target.value)} />
      
      <Button label={'Add Department'} onclick={()=>department_create(name)} />
    </div>
  </div>
</div>

  )
}




export default AddDepartment;
