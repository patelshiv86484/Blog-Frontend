import React,{useId} from 'react'
const Input= React.forwardRef(function inp({//Advanced way of forwardRef .Easy way is in select componenet. ./select
    label,
    type="text",//may be password also.
    className='',
    ...props
},reff){ 
     const id = useId();
     return (
        <div>
           {label &&  <label htmlFor={id}
           className='inline-block mb-1 pl-1'
             >{label}</label>}

             <input type={type} 
              className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
              ref={reff}// Passed reference of particular input field and in response state access is given to it.Otherwise onCLick and onChane like not works.
              {...props}
              id={id}/>
        </div>
           )
})
export default Input
