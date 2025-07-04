import React from 'react'

function Input({type,onChange,label,name,value,placeholder,required=false}) {
  return (
    <div>
        <label htmlFor="" className='font-medium'>{label}
          
        </label>
        <input type={type} className='w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none' 
        onChange={onChange} 
        name={name} 
        value={value} 
        placeholder={placeholder}
        required={required}/>

    </div>
  )
}

export default Input