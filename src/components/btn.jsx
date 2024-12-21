import React from 'react'

function Btn({//template for button.
    children,//text to be shown inside button text.
    type='button',//may be submit type also
    bgColor='bg-blue-600',
    textColor='white',
    className='',
    ...props
}) {
  return (
    <button className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Btn