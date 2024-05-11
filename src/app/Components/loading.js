"use client"
import React, { useRef } from 'react'
import { SquareX } from 'lucide-react';
function Loading({onclose}) {
  
  return (
    <div  onClick={(e)=>{
      if(popupref.current === e.target){
        onclose()
       }
    }} className='fixed inset-0 z-50 backdrop-blur-sm flex flex-col gap-1 items-center justify-center '>
    
    
        <span className='p-5 font-bold text-5xl'>Loading</span>        
        

    </div>
  )
}

export default Loading
