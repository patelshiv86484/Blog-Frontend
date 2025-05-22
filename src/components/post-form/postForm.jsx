import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,RTE,Select} from ".."
import  {createpost,updatePost} from '../../database/storage_service'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  console.log(post)
    const {register,handleSubmit ,control,setValue,getValues}=useForm({
      defaultValues:{
        titlee: post?.title||"",
        slug: post?._id||"",
        content: post?.description||"",
        status:post?.status||"active",
      },
    });

    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData);

    const submit=async (data)=>{ 
        if(post){//if post aleady exist.
        const dbPost=await updatePost({ slug:post._id ,title:data.titlee, ...data })
        if (dbPost){
          navigate(`/post/${dbPost.data._id}`);
        }
      }  
      else 
      {                 //if post not exist
       
          const dbPost=await createpost({data});          
          navigate(`/post/${dbPost.data._id}`)
      }
    };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("titlee", { required: true })}
                />
                
<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
               
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.imageFile}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    
                    {...register("status", { required: true })}
                />
                
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm