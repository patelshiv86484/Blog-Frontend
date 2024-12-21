import React,{useState,useEffect} from 'react'
import appwriteservice from "../appwrite/storage_service"
import { Container,PostCard } from '../components';
//for showing all posts in poastcard
function Allposts() {
    const [posts,setPosts]=useState([]);
    // useEffect(()=>{},[])
    appwriteservice.getposts([]).then(postes=>{
       if(postes)  setPosts(postes.documents)})
  return (
    <div className='w-full py-8'>
         <Container>
            <div className='flex flex-wrap'>
                 {
                    posts.map(postes=>(
                     <div key={postes.$id} className='p-2 w-1/4'>
                          <PostCard {...postes}/>
                     </div>
                    ))
                 }
            </div>
         </Container>
    </div>
  )
}

export default Allposts