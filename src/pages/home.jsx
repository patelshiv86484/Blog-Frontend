import React,{useState,useEffect} from 'react'
import  {createpost,getFilePreview,deleteFile,uploadfile,getposts,getpost,deletepost,updatePost} from '../database/storage_service'
import { PostCard,Container } from '../components'

function home() {
    const [post,setPost]=useState([])
    useEffect(()=>{
       getposts().then((posts)=>{
        if(posts){
            setPost(posts.data)
        }
       })
    },[])
    if(post.length===0){
     return (
        <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
     )
    }
    
    return (
      <>
      </>
    )
}

export default home