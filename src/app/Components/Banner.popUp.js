"use client"
import React, { useRef } from 'react'
import { SquareX } from 'lucide-react';
function BannerPopup({data, onclose}) {
  const popupref = useRef()

  return (
    <div ref={popupref} onClick={(e)=>{
      if(popupref.current === e.target){
        onclose()
       }
    }} className='fixed inset-0 z-50 backdrop-blur-sm flex flex-col gap-1 items-center justify-center '>
    
        <div className='mt-20 float-end'>
            
            <SquareX onClick={onclose}></SquareX>
        <img className=' mx-auto w-96 max-h-80 object-contain rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]'
         src={data.url} ></img>
            </div>
        <span className='p-5 font-bold text-lg'>Broadcasted banner</span>        
        

    </div>
  )
}

export default BannerPopup
