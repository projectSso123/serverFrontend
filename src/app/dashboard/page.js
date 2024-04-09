"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';


export default function Dashboard() {
  const router = useRouter();

  useEffect(()=>{
    router.push("/dashboard/profile");
  },[])

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}


