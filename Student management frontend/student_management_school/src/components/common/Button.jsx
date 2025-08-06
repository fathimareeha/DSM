import React from 'react'

function Button({label,onclick}) {
  return (
    <button onClick={onclick} className='mt-5 p-2 bg-blue-700 w-full'>{label}</button>
  )
}

export default Button