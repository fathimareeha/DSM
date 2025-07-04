import React, { useContext, useState } from 'react';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context';

function Createadmin_form() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
 
  
  

  const {admin_create,loading}=useContext(SuperadminContext)

  const handle_submit=(e)=>{
  admin_create(username,email,password1,password2)
    e.preventDefault()
  }
 
  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Registration</h1>
        <form onSubmit={handle_submit} className="space-y-4">

          <Input label="Username" type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required={true} />
          <Input label="Email" type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required={true}/>
          <Input label="Password" type="password" placeholder='Password' onChange={(e) => setPassword1(e.target.value)} required={true}/>
          <Input label="Confirm Password" type="password" placeholder='Confirm Password' onChange={(e) => setPassword2(e.target.value)} required={true}/>
          
            <div className='flex justify-center'>
          <button
            type="submit"
            className=" bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition mt-5"
            
          >
            {loading?<Loader/>: 'Register'}
          </button></div>
        </form>
      </div>
    </div>
  );
}

export default Createadmin_form;
