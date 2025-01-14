const conf={
    appwriteurl:String(import.meta.env.VITE_APPWRITE_URL),//import.meta.env for vite for other build tools other format is used
    projectid:String(import.meta.env.VITE_PROJECT_ID),
    databaseid:String(import.meta.env.VITE_DATABASE_ID),
    collectionid:String(import.meta.env.VITE_COLLECTION_ID),
    bucketid:String(import.meta.env.VITE_BUCKET_ID),
}

export default conf