import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authslice'
import authservice from '../../appwrite/auth_service'
function Logoutbtn() {
  
    const disp=useDispatch();

    function handlelogout(){
        authservice.logout().
        then(()=>{
        disp(logout())//if successfully logout from appwrite then only logout from store.
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'  onClick={handlelogout}>
    Logout
    </button>
  )
}

export default Logoutbtn