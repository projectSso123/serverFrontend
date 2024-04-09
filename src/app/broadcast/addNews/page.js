'use client'

import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const News = () => {

   
    const editor = useRef(null);
	const [content, setContent] = useState('');
	
	const addNewsHandler = () => {
		console.log("got this in final :",content);
		sendPostNewsReq(content);
	}

	const sendPostNewsReq = async(content) => {
		
		let res =  await fetch("http://localhost:8080/api/v1/broadcast/addnews",{
			method: 'POST', 
            credentials:'include',
            mode:"cors",
			headers: {
			  'Content-Type': 'application/json', 
			},
			body: JSON.stringify({content:content})
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

        <div className='py-2 text-center text-black bg-green-300'> <p className='font-semibold'>NEWS</p> </div>

		<div className='min-h-[50vh] bg-white px-3 py-1 rounded-lg shadow-lg '>
			<JoditEditor
				ref={editor}
				// value={content}
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
			onClick={addNewsHandler}
			> POST </button>
		</div>

    </div>
  )
}

export default News