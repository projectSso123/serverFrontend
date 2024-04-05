"use client"
import React, { useEffect, useState } from 'react'
import './page.scss'
import { useRouter } from 'next/navigation'

function page() {
  
  return (
    <div >
    <Form></Form>
    </div>
  )
}

function Form(){
  const router = useRouter()
  const [credential ,setcredential] = useState({applicationname:"",homepageURL:"",description:"",callbackURL:""})
  const handleSubmit= async()=>{
    try{
     const response = await fetch("http://localhost:8080/api/v1/registerclient",{
      method:"POST",
      mode:"cors",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({applicationname:credential.applicationname,homepageURL:credential.homepageURL,description:credential.description,callbackURL:credential.callbackURL})
     })
    if(response.ok){
      console.log(response)
      const data = await response.json()
      console.log(data);
      router.push(`/registerclient/showclientdetails?${new  URLSearchParams({clientid:data.clientid})}`)
    }
    else{
      console.log("errr - > " , response)
    }
    }
    catch(err){
    console.log(err)
    }
  }
  return (
    <div className='main-box'>
        <div className='main-heading'> 
        <h5>Register a new Application</h5>
        </div>
        <form className='form' onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit()
        }}>
        
        <label>Application name</label>
        <input type='text' name='applicationname' onChange={(e)=>{
          setcredential({...credential,[e.target.name]:e.target.value})
        }}></input>
        <span>Something user will recognize</span>
        
        <label>Homepage URL</label>
        <input type='text' name='homepageURL'
        onChange={(e)=>{
          setcredential({...credential,[e.target.name]:e.target.value})
        }}
        ></input>
        <span>Full URL to your application Homepage</span>


        <label>Application description</label>
        <textarea type='text' name='description'
        onChange={(e)=>{
          setcredential({...credential,[e.target.name]:e.target.value})
        }}
        ></textarea>
        <span>Description of your application</span>


        <label>Callback URL</label>
        <input type='text' name='callbackURL'
        onChange={(e)=>{
          setcredential({...credential,[e.target.name]:e.target.value})
        }}
        ></input>
        <span>Your callback URL</span>

        <button type='submit'>Register Application</button>
        
        </form>
    </div>
  )
}
export default page
