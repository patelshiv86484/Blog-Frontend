import React from 'react'
import storage from '../appwrite/storage_service'
import {Link} from 'react-router-dom'
function PostCard({$id,title,featuredimage}) {//$id($ is required) is id for whole post and featured image is id for image.
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full justify-center mb-4'>
         <img src={storage.getFilePreview(featuredimage)} alt={title} />
    {/* Returns a URL: The getFilePreview() method returns a URL that points to the preview version of the file (typically an image). */}
      </div>
      <h2 className='text-xl font-bold'> {title}  </h2>
    </div>
    </Link>
  )
}
export default PostCard