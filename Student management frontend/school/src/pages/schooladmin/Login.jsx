import React from 'react'
import Inputfield from '../../components/common/Inputfield'
import Button from '../../components/common/Button'

function Login() {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <div className='w-[500px]'>
        <Inputfield label={'Email'} type={'email'}/>
        <Inputfield label={'Password'} type={'password'}/>
        <Button label={'LOGIN'}/>
        </div>
    </div>
  )
}

export default Login