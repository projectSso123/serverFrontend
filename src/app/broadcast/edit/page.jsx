'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditPage({id , type}){
  const editor = useRef(null);
	const [content, setContent] = useState()
	const [news,setNews] = useState([])
	
	const editNewsHandler = () => {
		console.log("got this in final :",content);
		sendEditNewsReq(content);
	}

	const sendEditNewsReq = async(content) => {
		
		let res =  await fetch(BACKEND_BASE_URL+"/api/v1/broadcast/updatenews",{
			method: 'POST', 
            credentials:'include',
            mode:"cors",
			headers: {
			  'Content-Type': 'application/json', 
			},
			body: JSON.stringify({newsid:id,content:content})
		})
		
		if(res.ok)
		{
			let data = await res.json() ;
			alert("success in sendPostNewsReq");
		}
		else{
			alert("error in sendPostNewsReq");
		}
		
	}


  return (
    <div className='min-h-[85vh] w-full flex flex-col gap-[5vh] '>

      <div className='py-2 text-center text-black bg-green-300'> <p className='font-semibold'>EDIT {type}</p> </div>

      <div className='min-h-[50vh] bg-white px-3 py-1 rounded-lg shadow-lg '>
        <JoditEditor
          ref={editor}
          value={content}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {setContent(newContent)}}
          className='w-full h-full'
        />
      </div>
      
      <div className='flex justify-center w-full'>
        <button 
        className='  w-[100px] py-2 px-3 rounded-lg bg-green-600 text-white '
        onClick={editNewsHandler}
        > EDIT </button>
      </div>

    </div>
  )
}
