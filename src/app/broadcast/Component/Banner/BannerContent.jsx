"use client"
import React, { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import BannerPopUp from './Banner.popUp'
import Loading from '../Loading'
const BannerContent = () => {
  const [image, setimage] = useState();
  const [banners, setbanners] = useState([]);
  const [loading , setloading] = useState(false)

  const handleRefreash = () =>{
 getBanners()
  }
  const getBanners = async()=>{
    try{
      const response = await fetch(BACKEND_BASE_URL+"/api/v1/broadcast/getbanner",{
        method: 'POST',
        cache: 'no-store',
        credentials:'include',
			headers: {
			  'Content-Type': 'application/json', 
			},
      })
      if(!response.ok){
        console.log(response)
      }
      else{
        const data = await response.json();
         setbanners(data);
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const submithandler = async()=>{
    setloading(true)
    console.log(image);
    const formdata = new FormData();
    formdata.append('banner',image);

    const response = await fetch(BACKEND_BASE_URL+"/api/v1/broadcast/addbanner",{
        method: 'POST',
        cache: 'no-store',
        credentials:'include',
        body: formdata,
    })
 if(!response.ok){
 console.log(response);

 }    
 else{
  const result = await response.json()
  console.log(result) 
  getBanners()
 }
 setloading(false)
}
  const handlechange = (e) =>{
    const file = e.target.files[0];
    if(file){
        if(file.type.startsWith('image/')){
         setimage(file);
        }
    }

 }
  useEffect(()=>{
    getBanners()
  },[])
  
  return (
    <>
    <div>
    
<Broadcastbanners data={banners} handleRefreash={handleRefreash}></Broadcastbanners>

        
      <label htmlFor="cover-photo" className="text-center block text-sm font-medium leading-6 text-gray-900">
                Upload Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handlechange}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <button onClick={submithandler} className='mx-auto mt-2 px-3 py-1 font-medium text-white bg-gray-950 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Delete</button>
   
    </div>
    { loading && <Loading onclose={()=>setloading(false)}></Loading> }
   
    </>
  )
}
function Broadcastbanners({data , handleRefreash }){
  const [showPopup , setshowPopup] = useState(false)
  const [bannerdata , setbannerdata] = useState()

  
  return(
    <>
    <h1 className='text-center font-medium text-2xl bg-blue-400'>BROADCAST BANNERS</h1>
    <div className='gap-4 flex flex-wrap flex-row items-center justify-center'>
          {
           data.map((dt, index)=>(
            <Bannercards data={dt} key={index} handleRefreash={handleRefreash} setbannerdata={setbannerdata}  openPopup={()=>setshowPopup(true)}> </Bannercards>
           ))
          }
    </div>
    {showPopup && <BannerPopUp onclose={()=>setshowPopup(false)} data={bannerdata} ></BannerPopUp >}
    </>
  )
}
function Bannercards ({data,handleRefreash,setbannerdata,openPopup}){
 

  const DeleteBanner  = async()=>{
    
    try{
      const response = await fetch("http://localhost:8080/api/v1/broadcast/deletebanner",{
        method: 'POST',
        cache: 'no-store',
        credentials:'include',
			headers: {
			  'Content-Type': 'application/json', 
			},
      body:JSON.stringify({_id:data._id})
      })
      if(!response.ok){
        console.log(response)
      }
      else{
         handleRefreash()
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const handleDelete= ()=>{
    DeleteBanner()
  }
  return(
    <article class="group" >
    <img
    onClick={()=>{
      setbannerdata(data);
      openPopup()
    
    }}
      alt=""
      src={data?.url}
      class="w-40 rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
    />
  
    <div class="p-4 flex flex-col justify-center items-center">
      <a href="#">
        <h3 class="text-sm font-medium text-gray-900">BroadCasted Banner</h3>
      </a>
      <button onClick={DeleteBanner} className='mx-auto mt-2 px-3 py-1 font-medium text-white bg-red-600 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Delete</button>
  
  
    </div>
  </article>
  )
}
export default BannerContent