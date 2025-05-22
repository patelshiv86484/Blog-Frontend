import React,{useState,useEffect} from 'react'
import  {getposts} from "../database/storage_service"
import { Container,PostCard } from '../components';
//for showing all posts in poastcard
function Allposts() {
    const [posts,setPosts]=useState([]);

     useEffect(()=>{   
           getposts().
           then(postes=>{
       if(postes)  setPosts(postes.data)}).
       catch(error=>{
          console.log("Error in getting allposts in src/pages/Allposts.jsx ",error)
       });
     },[])



  return (
    <div className='w-full py-8'>
         <Container>
            <div className='flex flex-wrap'>
                 {
                    posts.map(postes=>(
                     <div key={postes._id} className='p-2 w-1/4'>
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