"use client"
import React, { useEffect, useState } from 'react'
import './page.scss'


function page() {
  
  return (
    <div >

      {/* <Form></Form> */}
      <ShowDetails></ShowDetails>
    </div>
  )
}
function ShowDetails(){
  const [key,setkey]= useState();
  const [secret, setsecret ] = useState();
  const getkey = async function(){
    try{
      const response = await fetch("http://localhost:8080/api/v1/getkey",{
        method:"POST",
        credentials:"include",
        mode:"cors",
          headers: {
            'Content-Type': 'application/json'
          },
      
      })
      if(!response.ok){
        console.log(response)
      }
      else{
        const data = await response.json()
           setkey(data.key)
           setsecret(data.secret)
      }
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getkey()
  },[])
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy to clipboard!');
    }
  };
  return(
    <>
    <div className='main-box'>
        <div className='main-heading'> 
             <h5>Client Key and Secret Key</h5>
        </div>
        <div className='showbox'>
          <div className='key'>
            <div className='title'>client Key</div>
          <p className='text' onClick={()=>{
            handleCopy(key)
          }}>{key}</p>
          </div>
          
          <div className='key'>
          <div className='title'>client Secret</div>
          <p className='text'onClick={()=>{
            handleCopy(secret)
          }}>{secret}</p>
          </div>
        </div>
    </div>
    </>
  )
}
function Form(){
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
