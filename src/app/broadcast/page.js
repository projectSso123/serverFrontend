import React from 'react'
import Image from 'next/image';

// const urlParams = new URLSearchParams(window.location.search)
// const id = urlParams.get('_id')
// const content = urlParams.get('content')

const broadcast = () => {
  return (
    <div className='flex justify-center w-full h-full text-3xl font-semibold uppercase '>
      <div
      style={{backgroundImage:"<img src={'/broadcast.png'}  width={500} height={100}  />"}}
      >
        
      </div>
    </div>
  )
}

export default broadcast