"use client"
import React, { useState } from 'react'
import { PROFILE_PAGE,NEWS_PAGE,NOTIFICATION_PAGE,BANNER_PAGE } from './Consts';
import News from './Component/News/News';
import Notification from './Component/Notification/Notification';
import Banner from './Component/Banner/Banner';
import { useContext } from 'react';
import { SidebarContext } from './layout';
function Dashboard(){
    let {currentPage , setCurrentPage} = useContext(SidebarContext)
   
    return (
        <>
        {currentPage === PROFILE_PAGE && <></>}
        {currentPage === NEWS_PAGE && <News/>}
        {currentPage === NOTIFICATION_PAGE && <Notification/>}
        {currentPage === BANNER_PAGE && <Banner/>}
        </>
    )
}
export default Dashboard;