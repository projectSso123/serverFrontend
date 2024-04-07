import ApplicationCard from '@/app/Components/ApplicationCard'
import React from 'react'

const application_info = () => {
  return (
    <div className='w-full h-auto p-5 '>
        
        <h4 class="text-lg font-semibold text-gray-900 capitalize  md:text-xl text-center">⚒️ Registered Applications 🛠️</h4>
        <p class="text-center text-sm ">Tools that will help you get things done in less time.</p>
        
        {/* application cards gallery */}
        <div className='flex flex-wrap gap-5 mt-5'>
            {
                Array(9).fill(1).map((obj,i)=>(
                    <ApplicationCard key={i} />
                ))
            }
        </div>
    </div>
  )
}

export default application_info