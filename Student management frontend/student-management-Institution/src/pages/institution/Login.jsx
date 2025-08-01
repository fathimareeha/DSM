import React, { useContext, useState } from 'react'
import Inputfield from '../../components/common/Inputfield'
import Button from '../../components/common/Button'
import { Authcontext } from '../../context/institution/Authcontext'

function Login() {
  const {collegelogin} = useContext(Authcontext)
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

    <div className="space-y-4">
      <Inputfield label={'Username'} onchange={(e)=>setusername(e.target.value)} />
      <Inputfield label={'password'} onchange={(e)=>setpassword(e.target.value)} />
      <Button label={'login'} onclick={()=>collegelogin(username,password)} />
    </div>
  </div>
</div>

  )
}

export default Login