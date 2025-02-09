import { useState,useEffect } from 'react'
import {useDispatch} from "react-redux"
import authservice from './appwrite/auth_service'
import {login,logout} from "./store/authslice"
import {Header,Footer} from  "./components/index"//here if  /index  is not written then also it works correctly.
import {Outlet} from "react-router-dom"
import './App.css'

function App() { 
  const [loading,setLoading] =useState(true)
  const disp=useDispatch();
  
  useEffect(() => {
   authservice.getcurrentuser().//if refreshing or coming back to website without logout will loginus again by storing our session.
   then((userdata)=>{
      if(userdata) disp(login({userdata}));
      else disp(logout())
   })
   .finally(()=>{
    setLoading(false);
   })
  }, [])
  

 return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) :null
}

export default App