import React ,{useEffect,useState} from 'react'
import {Container,PostForm} from '../components'
import  {createpost,getFilePreview,deleteFile,uploadfile,getposts,getpost,deletepost,updatePost} from '../database/storage_service'
import { useNavigate,useParams } from 'react-router-dom'
function editPost() {
 const [post,setPost] =useState(null);
 const navigate=useNavigate();
 const {slug}=useParams();

 useEffect(()=>{
    if(slug){
        getpost(slug).then(postes=>{//error in this  by owner
            if(postes){
              setPost(postes.data);//main here is error
            } 
        })
    }
    else{
       navigate('/')
        }
 },[slug,navigate])

  return post?(
    <div className='py-8'>
    <Container>
        <PostForm post={post} />
    </Container>
    </div>
  ):null
}

export default editPost