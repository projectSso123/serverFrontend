import ApplicationCard from '@/app/Components/ApplicationCard'
import React, { useEffect, useState } from 'react'

const application_info = () => {

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
        
        <h4 class="text-lg font-semibold text-gray-900 capitalize  md:text-xl text-center">⚒️ Registered Applications 🛠️</h4>
        <p class="text-center text-sm ">Tools that will help you get things done in less time.</p>
        
        {/* application cards gallery */}
        <div className='flex flex-wrap gap-5 mt-5'>
            {
              appInfo.map((obj,i)=>(
                  <ApplicationCard key={i} />
              ))
            }
        </div>
    </div>
  )
}

export default application_info