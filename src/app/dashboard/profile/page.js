'use client'

import React, { useEffect, useState } from 'react'

export default function Profile(){

    const [profile,setProfile] = useState([]);

    useEffect(()=>{
        getProfile()
    },[]);

    const getProfile = async() => {
        try {
            const res = await fetch('http://localhost:8080/api/v1/getprofile',{
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
                setProfile(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return ( 
    <div className='w-full h-full mt-[15vh] '>
    <div class="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
            <div class="md:col-span-1 h-48 shadow-xl ">
                    <div class="flex w-full h-full relative">
                        <img src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png" class="w-44 h-44 m-auto" alt="" />

                    </div>
            </div>
            <div class="md:col-span-3 h-48 shadow-xl  space-y-2 ">
                    <div class="flex items-center ">
                        <span
                            class="text-sm border bg-blue-50 font-bold uppercase  rounded-l px-4 py-2  whitespace-no-wrap w-2/6">Name:</span>
                        <span 
                            class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            > {profile?.name} </span>
                    </div>
                    <div class="flex items-center ">
                        <span
                            class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Email:</span>
                        <span 
                            class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            > {profile?.email} </span>
                    </div>
                    <div class="flex ">
                        <span
                            class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Role:</span>
                        <span 
                            class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            > Admin </span>
                    </div>
            </div>
            <div class="md:col-span-3 h-48 shadow-xl p-4 space-y-2 hidden md:block">
                <h3 class="font-bold uppercase"> Profile Description</h3>
                <p class=""> 
                    Project Unified CMS for Government websites
                </p>
            </div>
                
        </div>
    </div>
  )
}

