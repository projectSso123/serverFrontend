'use client'

import React from 'react'
import Header from '../Components/Header'
import Sidenav from '../Components/User.Sidenav'
import BroadcastSidebar from '../Components/Broadcast.Sidebar.'

export default function layout ({children}) {
  return (
    <div className="w-screen overflow-x-hidden">
        
        <Header/>

        <div className="w-full flex min-h-[85vh] ">
          <BroadcastSidebar/>
          <div className="ml-[16vw] w-[84vw] mt-[15vh] min-h-[85vh]">{children}</div>
        </div>
        
      </div>
  )
}

