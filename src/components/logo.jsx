import React from 'react'
import logo from './logo_img.webp';

function Logo({width='100px'}) {
  return (
    <>
    <div className='w-20'>
    <img src={logo} alt="Logo" />
    </div>
    </>
  )
}

export default Logo