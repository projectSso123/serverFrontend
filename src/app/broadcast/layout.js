"use client"
import React from 'react'
import SideBar from './Component/sideBar';
import { createContext,  useState } from 'react';
import { PROFILE_PAGE,NEWS_PAGE,NOTIFICATION_PAGE,BANNER_PAGE } from './Consts';

export const SidebarContext = createContext();

function DashboardLayout({children}){
    const [currentPage, setCurrentPage] = useState(PROFILE_PAGE)
return (
<SidebarContext.Provider value={{currentPage,setCurrentPage}} >
<div className='flex flex-grow relative'>
<SideBar></SideBar>
<div className='ml-72 w-4/6'>
    {children}
</div>
</div>
</SidebarContext.Provider>
)
}
export default DashboardLayout;
