"use client"
import React, { useEffect, useState } from 'react'
import '../page.scss'
function ShowDetails(){

    const [key,setkey]= useState();
    const [secret, setsecret ] = useState();
    const getkey = async function(clientid){
      try{
        const response = await fetch("http://localhost:8080/api/v1/getkey",{
          method:"POST",
          credentials:"include",
          mode:"cors",
            headers: {
              'Content-Type': 'application/json'
            },
        body:JSON.stringify({clientid:clientid})
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
      const params = new URLSearchParams(window.location.search);
      console.log("this is params",params)
      const client = params.get("clientid");
      getkey(client);

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

  export default ShowDetails