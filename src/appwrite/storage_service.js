import confi from "../confi/confi.js"
import { ID, Client, Databases, Storage,Query } from "appwrite"
export class storage {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(confi.appwriteurl)
      .setProject(confi.projectid)
    this.database = new Databases(this.client);//for storing structured and semi-structured data here we are storing posts related data.
    this.bucket = new Storage(this.client);//for  storing unstructured data like blogs,images,videos,etc here we are storing files in it...
  }

  //Posts services using DataBase Only.
  async createpost({ title, slug, content, featuredImage, status, userId }) {//slug is used as id and  is image id o be recognised from storage.
    try {
      return await this.database.createDocument( //In appwrite/docs/database/document
        confi.databaseid, 
        confi.collectionid,
        slug,  //used as document-id.
        {
          title, content, featuredimage:featuredImage, status, userid:userId
        }
      )
    }
    catch (error) {
      console.log("Appwrite :: createpost :: Error::", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status, userid }) {
    console.log(status)
    try {
      status=status=="active"?true:false;
      console.log("updated: ",status)
      return await this.database.updateDocument(
        confi.databaseid,
        confi.collectionid,
        slug,
        {
          title, content, featuredimage, status,
          //  userid,// this is not passed for updation as allowing selected user to update post from it's device only so keep it same as it is.
        }
      )
    } catch (error) {
      console.log("Appwrite :: update :: Error::", error);
    }

  }

  async deletepost(slug) {
    try {
      await this.database.deleteDocument(
        confi.databaseid,
        confi.collectionid,
        slug
      )
      return true;
    }
    catch (error) {
      console.log("Appwrit :: deletepost :: Error", error);
    }
  }

  async getpost(slug) {
    try {
      return await this.database.getDocument(
        confi.databaseid,
        confi.collectionid,
        slug,
      )
    }
    catch (error) {
      console.log("Appwrite :: getpost :: Error:: ", error)
    }
  }

  async getposts(queries = [Query.equal("status", "active")]) {//status and active is key value pair created by us.
    try {
      return await this.database.listDocuments(
        confi.databaseid,
        confi.collectionid,
        queries,//or define here in place of , queries -> [ ]
      )
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false
    }
  }

  //File services using Storage Only.
  async uploadfile(file){
    try {
      return await this.bucket.createFile(
        confi.bucketid,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite :: uploadfile :: Error",error)
      return false
    }
  }

  async deleteFile(fileid){
    try{
     await this.bucket.deleteFile(
      confi.bucketid,
      fileid,
    )
      return true;
  }
  catch(error){
    console.log("Appwrite :: Deletefile :: Error",error)
    return false;
  }
  }

  getFilePreview(fileid){
    return this.bucket.getFilePreview(
      confi.bucketid,
      fileid,
    )
  } 
}  

const strg = new storage();
export default strg;