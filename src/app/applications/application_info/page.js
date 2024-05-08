"use client"
import ApplicationCard from '@/app/Components/ApplicationCard'
import  Cookie  from 'js-cookie'
import React, { useEffect, useState } from 'react'

const application_info = () => {

  const [appInfo, setAppInfo] = useState([])

  useEffect(()=>{
    getProfile()
  },[])

  const getProfile = async() => {
     const clientid = Cookie.get("clientid")
    try {
        const res = await fetch('http://localhost:8080/api/v1/getapplication',{
            method:"POST",
            credentials:'include',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({clientid})
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
    <div className='w-full h-auto p-5 mt-20'>
        <div>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7 text-gray-900">Application Information</h3>
  </div>
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Application name</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{appInfo.applicationname}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Application Description</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{appInfo.description}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Home Page URL</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{appInfo.homepageURL}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Redirect URL</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{appInfo.callbackURL}</dd>
      </div>

    
    </dl>
  </div>
</div>
    </div>
  )
}

export default application_info