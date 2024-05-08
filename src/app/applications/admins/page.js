'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Admins = () => {
    useEffect(()=>{
        getemployees()
    },[])
    
    
    const [emps,setemps] = useState([])
    const getemployees = async()=>{
        const clientid = Cookies.get("clientid")
      try{
        const response = await fetch('http://localhost:8080/api/v1/getemployees',{
            method:"POST",
            credentials:'include',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({clientid})
        })
       
        if(!response.ok){
            console.log(response)
        }
        else{
            const data = await response.json()
            console.log(data)
            setemps(data);
        }
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div className="w-full h-auto mt-20">

        <div class=" w-full flex min-h-screen  px-3  bg-white">
            
            <div class="w-full p-6  px-0">
                
                <table class="w-full min-w-max table-auto text-left">
                    
                    <thead>
                        <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">S.No</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Name</p>
                            </th>
                        
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Account type</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">verify</p>
                            </th>
                            
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                    emps.map((dets,i)=>(
                            <tr key={i}>
                                <td class="p-4 border-b border-blue-gray-50">
                                    <div class="flex items-center gap-3">
                                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{i+1}</p>
                                    </div>
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{dets.name}</p>
                                </td>
                            
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{dets.role}</p>
                                </td>
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{dets.verified}</p>
                                </td>
                               
                                
    
                            </tr>
                        ))
                    }  
                    </tbody>
                    
                </table>
                
            
            </div>

        </div>
        
    </div>
  )
}

export default Admins