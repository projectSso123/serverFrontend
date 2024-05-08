"use client"
import ApplicationCard from '@/app/Components/ApplicationCard'
import React, { useEffect, useState } from 'react'

function page() {

  const [appInfo, setAppInfo] = useState([])

  useEffect(()=>{
    getProfile()
  },[])

  const getProfile = async() => {
    try {
        const res = await fetch('http://localhost:8080/api/v1/getapplications',{
            method:"POST",
            credentials:'include',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(res.ok)
        {
            const data = await res.json();
            setAppInfo(data)
            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
}
  
  return (
    <div className='w-full h-auto p-5 '>
        

    </div>
  )
}

export default page
