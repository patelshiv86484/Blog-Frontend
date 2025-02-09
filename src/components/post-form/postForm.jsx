import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,RTE,Select} from ".."
import appwriteService from '../../appwrite/storage_service'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit   ,watch,control,setValue,getValues}=useForm({
      defaultValues:{
        title: post?.title||"",
        slug: post?.$id||"",
        content: post?.content||"",
        status:post?.status||"active",
      },
    });

    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData);
    const submit=async (data)=>{ 
        if(post){//if post aleady exist.
              const file=data.image[0] ? await appwriteService.uploadfile(data.image[0]):null //newly generated post image is uploaded.
               if(file){
                appwriteService.deleteFile(post.featuredImage);
               }

        const dbPost=await appwriteService.updatePost(post.$id,{
          ...data,
          featuredImage:file?  file.$id :undefined
        })
        if (dbPost){
          navigate(`/post/${dbPost.$id}`);
        }
      }  else {                 //if post not exist
        
         const file=await appwriteService.uploadfile(data.image[0]);
         if(file){
          const fileId=file.$id;
          data.featuredImage=fileId;
          const dbPost=await appwriteService.createpost({...data,userId:userData.userdata.$id,status:userData.userdata.status});
          if(dbPost){
            navigate(`/post/${dbPost.$id}`);
          }
         }
      }
    };

    const slugTransform=useCallback((value)=>{
     if(value && typeof(value)==='string')
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";

    },[])

    React.useEffect(()=>{//    senior interview level question
      const subscription=watch((value,{name})=>{
            if(name==='title'){
              console.log(value)
              setValue("slug",slugTransform(value.title),{shouldValidate:true});//value.title as consist of all input fields data in value
            }
      })

      return ()=> subscription.unsubscribe();//  .unsubscribe is attached to any function in useEffect to avoid infinite looping condition.
    },[watch,slugTransform,setValue])//watch attached to title input.
    
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {//onInput is an eventhandler it is trigered on changing input values.
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content") || ""} />
               
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
                            src={appwriteService.getFilePreview(post.featuredimage)}
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