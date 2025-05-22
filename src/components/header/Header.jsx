import React from 'react'
import {Container,Logo} from "../index"
import Logoutbtn from "./Logoutbtn"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'//accepts array of all links in navigation bar and by applying map all are displayed.It is alson known as Programmatic Navigation.
import { useSelector } from 'react-redux'
function Header() {
  let active=useSelector(state=>state.auth.status);//is user active for showing logout button.
  const navigate=useNavigate();
  const navItem=[//infuture if requires to add new navlink no need to add button manually just add in array as object and all done.
    {
      name:"Home",
      slug:'/',        
      active:true      //  ---------------------------------->If active then display them<----------------------------------.
    },{
      name:"Login",
      slug:'/login',
      active:!active,
    },{
      name:"Sign-up",
      slug:'/signup',
      active:!active
    },{
      name:"All-posts",
      slug:'all-posts',
      active:active,
    },{
      name:"Add-posts",
      slug:'add-post',
      active:active,
    },
  ]
  
   return (
    <header className='py-3 shadow bg-gray-500'>
   <Container>
    <nav>
      <div>
        <Link to='/'>
        <Logo/>
        </Link>
      </div>
     <ul  className='flex ml-auto'>
     {
      navItem.map((item)=>  
         item.active ? (
          <li key={item.slug}>
          <button 
             onClick={()=> navigate(item.slug)}//appending item.slug to the current URL
             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >{item.name}</button>
          </li>
         ) : null
      )
    }
    {
      active && (
        <li>
          <Logoutbtn />
        </li>
      )
    }
    </ul>
    </nav>
   </Container>
   </header>
  )
}

export default Header 