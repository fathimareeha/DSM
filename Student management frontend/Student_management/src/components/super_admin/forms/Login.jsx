import React, { useContext, useState } from 'react'
import Input from '../Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'
import Loader from '../Loader'


function Login() {
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  
  const {handle_login,loading}=useContext(SuperadminContext)
  const handle_submit=(e)=>{
  handle_login(username,password)
    e.preventDefault()
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Super Admin Login</h1>
        <form onSubmit={handle_submit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <div className='flex justify-center'>
          <button
            type="submit"
            className=" px-7 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-200"
          >{loading?<Loader/>: 'Login'}
           
          </button></div>
        </form>
      </div>
    </div>
  )
}

export default Login