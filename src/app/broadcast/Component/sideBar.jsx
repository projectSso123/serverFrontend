"use client"
import React from 'react'

import { PROFILE_PAGE,NEWS_PAGE,NOTIFICATION_PAGE,BANNER_PAGE } from '../Consts';
import { useContext } from 'react';
import { SidebarContext } from '../layout';

function SideBar(){
    let {currentPage , setCurrentPage} = useContext(SidebarContext)
   

    const liStyle= "my-4 font-bold text-white text-xl"
    return (
    <>    
    
    <nav className="fixed h-full top-0 left-0 w-1/6 shadow-xl">
        <div className="h-full w-full border bg-white">
         
         <ul className='w-full flex items-start flex-col  '>
            <li onClick={()=>setCurrentPage(PROFILE_PAGE)}
            className="mt-10 ml-4 p-1 text-start   text-xl  hover:text-blue-400 ease-in-out rounded-sm transition " >
             Profile
            </li>
            <li onClick={()=>setCurrentPage(NEWS_PAGE)} 
            className="mt-5 p-1  ml-4 text-xl hover:text-blue-400 ease-in-out rounded-sm transition ">
             News
            </li >
            <li onClick={()=>setCurrentPage(NOTIFICATION_PAGE)}
            className="mt-5 p-1 ml-4  text-xl hover:text-blue-400 ease-in-out rounded-sm transition ">
             Notification
            </li>
            <li onClick={()=>setCurrentPage(BANNER_PAGE)} 
            className="mt-5 p-1 ml-4 text-xl hover:text-blue-400 ease-in-out rounded-sm transition">
             Banner
            </li>
         </ul>
        </div>
    </nav>
 
    </>
    )
}
export default SideBar;