import React,{useState,useEffect} from 'react'
import appwriteservice from '../appwrite/storage_service'
import { PostCard,Container } from '../components'

function home() {
    const [post,setPost]=useState([])
    useEffect(()=>{
       appwriteservice.getposts().then((posts)=>{
        if(posts){
            setPost(posts.documents)
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
    
    console.log(post)
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((post) => 
                       {return  <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            {/* or <PostCard  post={post} /> */}
                        </div>}
                    )}
                </div>
            </Container>
        </div>
    )
}

export default home