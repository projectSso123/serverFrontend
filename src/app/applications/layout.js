import React from 'react'
import Header from '../Components/Header'
import Sidenav from '../Components/Application.Sidenav'

export default function layout ({children}) {
  return (
    <div className="w-screen overflow-x-hidden">
        
        <Header/>
        
        <div className="w-full flex min-h-[85vh] ">
          <Sidenav/>
          <div className="ml-[16vw] w-[84vw]">{children}</div>
        </div>
        
      </div>
  )
}

