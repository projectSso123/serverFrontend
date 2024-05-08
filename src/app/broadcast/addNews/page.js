'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const News = () => {

    const router = useRouter()

	useEffect(()=>{
		getNews()
	},[])
   
    const editor = useRef(null);
	const [content, setContent] = useState('')
	const [news,setNews] = useState([])
	
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

	async function getNews()
  {
    let res =  await fetch("http://localhost:8080/api/v1/broadcast/getnews",{
			method: 'POST', 
			credentials:'include',
			mode:"cors",
			headers: {
			  'Content-Type': 'application/json', 
			}
		})
		
		if(res.ok)
		{
			let data = await res.json() ;
			console.log("data of getnews")
			console.log(data);
			setNews(data);
			alert("success in getNews");
		}
		else{
			alert("error in getNews");
		}
  }

  console.log(news)

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

		{
			<div class="w-full p-6  px-0">
                
                <table class="w-full min-w-max table-auto text-left">
                    
                    <thead>
                        <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">S.No</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Content</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Created</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">application</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Edit</p>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                        news.map((dets,i)=>
                            <tr key={i}>
                                <td class="p-4 border-b border-blue-gray-50">
                                    <div class="flex items-center gap-3">
                                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{i+1}</p>
                                    </div>
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <div dangerouslySetInnerHTML={{ __html: dets.content }} />
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Wed 3:00pm</p>
                                </td>
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{dets.clientname}</p>
                                </td>
                                
                                
                                
                                {/* edit button */}
                                <td class="p-4 border-b border-blue-gray-50">
                                <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button" onClick={()=>{router.push(`/broadcast/edit/?${new URLSearchParams({"_id":dets._id,"type":"News"})}`)}}>
                                    <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                        </svg>
                                    </span>
                                </button>
                                </td>
                            </tr>
                        )
                    }  
                    </tbody>
                    
                </table>
                
            
            </div>
		}

    </div>
  )
}

export default News