import React from 'react'
import {Controller} from 'react-hook-form'//used for handling uncontrolled Editor component for sending reference and manage states(comes form same library from where forwardRef() hook comes).
import {Editor} from '@tinymce/tinymce-react'//Reach text editor wrap inside Controller for handling reference.
function RTE({name,control,label,defaultValue=""}) {//control is attribute form parent component which dexides where to pass state(from component to form) when submitted.
  return (
    <div  className='w-full' >
        {label && <label className='inline-block mb-1 pl-1' >{label}</label> }
    
    <Controller
    name={name || 'content'}
    control={control}     //passing all control and states to parent component
    render={            ( {field:{onChange}} )  => (    //Arrow function is assigned
     <Editor
     apiKey='25j31g20dhy9g55b7529s07i61lzh3i1kkyy2h5w9zztsc3c'
     initialValue={defaultValue}
     init={{
        // initialValue: defaultValue,
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