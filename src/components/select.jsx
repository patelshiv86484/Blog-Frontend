import React,{useId} from 'react'
function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id=useId();
  return (
    <div className='w-full'>
        
        {label && <label htmlFor={id} className={`${className}`}></label>}
    <select  id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    ref={ref}
    {...props}
    >
    {options ? options.map(item=>(//here conditional rendering as if options is empty then by looping over it crashes app.
        <option key={item} value={item}>
            {item}
        </option>
    )):null}
    </select>
    </div>
  )
}
  
export default React.forwardRef(Select)//easy way then done in input compnenet ./input.jsx