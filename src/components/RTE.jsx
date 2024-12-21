import React from 'react'
import {Controller} from 'react-hook-form'//used for handling uncontrolled Editor component for sending reference and manage states.
import {Editor} from '@tinymce/tinymce-react'//Reach text editor wrap inside Controller for handling reference.
function RTE({name,control,label,defaultval=""}) {
  return (
    <div  className='w-full' >
        {label && <label className='inline-block mb-1 pl-1' >{label}</label> }
    
    <Controller
    name={name || 'content'}
    control={control}
    render={({field:{onChange}})=>(    //Arrow fucntion is assigned
     <Editor
     intialValue={defaultval}
     init={{
        initialValue: defaultval,
        height: 500,
        menubar: true,
        plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
        ],
        toolbar:
        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
    }}
    onEditorChange={onChange}
   />
     )}   
    />
 </div>
  )
}

export default RTE