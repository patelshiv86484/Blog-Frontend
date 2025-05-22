import React from 'react'
import {Link} from 'react-router-dom'

//Small previews of each posts as component is generated here and used in /all-posts page.

function PostCard({_id,title,imageFile}) {//$id($ is required) is id for whole post and featured image is id for image

  return (
    <Link to={`/post/${_id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full justify-center mb-4'>
         {/* <img src={storage.getFilePreview(imageFile)} alt={title} /> */}
         <img src={imageFile} alt={title} />

    {/* Returns a URL: The getFilePreview() method returns a URL that points to the preview version of the file (typically an image). */}
      </div>
      <h2 className='text-xl font-bold'> {title}  </h2>
    </div>
    </Link>
  )
}
export default PostCard