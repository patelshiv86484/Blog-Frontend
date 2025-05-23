
import axios from "axios";

  async function createpost({ data }) {
    console.log(data)
   const formData = new FormData();
   formData.append("title", data.title);
  formData.append("description", data.content);
  formData.append("status", data.status);

  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);  // FileList -> single file
  }
    try {
      const getteddata= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/images/upload-image`,formData,{
       withCredentials: true,
     } )
     return getteddata.data
    }
    catch (error) {
      console.log("database :: createpost :: Error::", error);
      throw error;
    }
  }

  async function updatePost({slug,  title, content,  status,image }) {
    status=(status=="active");
    
   const formData = new FormData();
   formData.append("title", title);
  formData.append("description", content);
  formData.append("status", status);

  if (image && image[0]) {
    formData.append("image", image[0]);  // FileList -> single file
  }
    try {
      const getteddata= await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/images/edit-image/${slug}`,formData,{
        withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database :: update :: Error::", error);
    }

  }

  async function deletepost(slug) {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/images/delete-image/${slug}`,{},{
        withCredentials:true,
      })
      return true;
    }
    catch (error) {
      console.log("Appwrit :: deletepost :: Error", error);
    }
  }

  async function getpost(slug) {
    try {
      const getteddata= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images/get-image/${slug}`,{
        withCredentials: true,
      })
      return getteddata.data
    }
    catch (error) {
      console.log("database :: getpost :: Error:: ", error)
    }
  }

  async function getposts() {//status and true is key value pair created by us in indexes.
    try {
      const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images/posts`,{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database serive :: getPosts :: error", error);
      return false
    }
  }

  //File services using Storage Only(Buckets).
  async function uploadfile(file){
    try {
      return await this.bucket.createFile(
        confi.bucketid,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("database :: uploadfile :: Error",error)
      return false
    }
  }

  async function deleteFile(fileId){
    try{
     await this.bucket.deleteFile(
      confi.bucketid,
      fileId,
    )
      return true;
  }
  catch(error){
    console.log("database :: Deletefile :: Error",error)
    return false;
  }
  }

  function getFilePreview(fileid){
    return this.bucket.getFilePreview(//this generates url which can be used in img tag and other similar tags using url's.
      confi.bucketid,
      fileid,
    )
  } 

  export {createpost,getFilePreview,deleteFile,uploadfile,getposts,getpost,deletepost,updatePost}
