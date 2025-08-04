import React, { useContext, useState } from 'react'
import Inputfield from '../../components/common/Inputfield'
import Button from '../../components/common/Button'
import { Authcontext } from '../../context/institution/Authcontext'

function Login() {
  const {schoollogin} = useContext(Authcontext)
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <div className='w-[500px]'>
        <Inputfield label={'Username'} onchange={(e)=>setusername(e.target.value)}/>
        <Inputfield label={'Password'} onchange={(e)=>setpassword(e.target.password)}/>
        <Button label={'LOGIN'} onclick={()=>schoollogin(username,password)}/>
        </div>
    </div>
  )
}

export default Login