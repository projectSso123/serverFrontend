"use client"
import { ThemeProvider } from "styled-components";
import StyledContainer, { StyledButton, StyledFrom, StyledInput, StyledLabel } from '../styled.component/form.styledcomponent.js'
import { StyledHeader } from "../styled.component/form.styledcomponent.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StyledBox } from "../styled.component/form.styledcomponent.js";
import { StyledTile } from "../styled.component/form.styledcomponent.js";
import './page.scss'
const theme = {
  dark:{
    primary:"black",
    text:"white"
  },
  light:{
    primary:"white",
    text:"black"
  }
}
export default function Home() {
  const [display , setdisplay] = useState(1);
  const [userAccountData, setuserAccountData] = useState()
  const [isloggedIn, setLoggedin] = useState(false)
  const [verified , setverified] = useState(false)
  
  const handleSignup = (n)=>{
    setdisplay(1);
  }
  const verify = async(obj)=>{
    try{
      const response = await fetch("http://localhost:8080/api/v1/verfiyclient",{
        method:"POST",
        credentials:"include",
        mode:"cors",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(obj)
      })
      if(!response.ok){
      //  setverified(false)
      }
      else{
        setverified(true)
      }
    }
    catch(err){

    }
  }
  const getusers= async()=>{
    try{
      const response = await fetch("http://localhost:8080/api/v1/getusers",{
    method:"POST",
    mode:"cors",
    credentials:"include"
   })
   if(response.ok){
    console.log(response)
    const data = await response.json();
    if(data)
    setuserAccountData(data)

   }

    }
    catch(err){
    console.log(err)
    }
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const redirect_uri = urlParams.get('redirect_uri');
    const client_id = urlParams.get('client_id');
    const response_type = urlParams.get("response_type")
    const scope = urlParams.get("scope")
    const state = urlParams.get('state')
    if(redirect_uri == null && client_id == null && response_type == null && scope == null && state == null){
      setverified(true)
    }
    else{
      verify({urlParams,redirect_uri,client_id,response_type,scope,state})
    }
   getusers();

  },[isloggedIn])
  if(!verified){
    return (
      <ThemeProvider theme={theme}>
      <UnAuthorized data={userAccountData}></UnAuthorized>
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
    
    {
      userAccountData  ?    <ChooseAccountTable data={userAccountData}>
  
      </ChooseAccountTable> : display === 2 ? <Signup handleSignup={handleSignup} setdisplay={setdisplay}></Signup> :display === 1 && <Login setdisplay={setdisplay} setLoggedin={setLoggedin} ></Login>
    }
   
    </ThemeProvider>
      );
}
function UnAuthorized ({data}){
  return(
  <StyledContainer>
    <StyledLabel>Sign up with Root</StyledLabel>

      <span className="auth-heading">Access blocked: Authorization Error</span>
     {/* { data && <StyledTile>
          <span className="tileUsername">{data.username}</span>
          <span className="tileEmail">{data.email}</span>
        </StyledTile>} */}
        <StyledTile>
          <span className="tileEmail">rohanb23@gmail.com</span>
        </StyledTile>

      <div className="auth-info">The OAuth client was not found.</div>
      <div className="auth-info">Error 401: invalid_client</div>
  </StyledContainer>
  )
}

function Login({setdisplay , setLoggedin}){


  const [credential , setcredential] = useState({email:"",password:""})
  const [redirect_uri, setredirect] = useState('');
  const [client_id ,setClient_id] = useState('');
  const [state,setstate] = useState();
 
   useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const redirect_uri = urlParams.get('redirect_uri');
    const client_id = urlParams.get('client_id');
    
    setstate(urlParams.get('state'))
    setredirect(redirect_uri);
    setClient_id(client_id);
  
   },[])
  const changehandler = (e) =>{
    setcredential({...credential, [e.target.name]: e.target.value});
    }
  
  
  const submithandler = async(event)=>{
    event.preventDefault()
    try{
   
    const response = await fetch('http://localhost:8080/api/v1/signin',{
      method:"POST",
      mode:'cors',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({email:credential.email,password:credential.password,state:state})

    })
    if(!response.ok){
      console.log("failed")
      alert(response.message)
    }
    else{
      const data = await response.json();
      setLoggedin(true)
        
    }
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <>
    <StyledContainer>
    <StyledLabel>Sign up with Root</StyledLabel>
      <StyledHeader>Login</StyledHeader>
    <StyledFrom>
      <StyledInput placeholder="email" name="email" onChange={changehandler}></StyledInput>
      <StyledInput placeholder="password" name="password" onChange={changehandler}></StyledInput>

      <StyledButton onClick={submithandler}>Proceed</StyledButton>
 
      </StyledFrom>
    </StyledContainer>
      <StyledButton onClick={()=>{
        setdisplay(2);
      }}>Proceed</StyledButton>
      this is button
      <StyledButton onClick={async()=>{
        const response  = fetch("http://localhost:8080/login",{
          method:"POST",
      mode:'cors',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({email:"rohanb@gmail.com"})
        })
     if(response.ok){
      const data = await response.JSON();
      console.log(data);
     }  
      }
        }> Click me</StyledButton>
      <StyledButton onClick={async()=>{
        const response  = fetch("http://localhost:8080/login",{
          method:"POST",
      mode:'cors',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({email:"rohankir@gmail.com"})
        })
     if(response.ok){
      const data = await response.JSON();
      console.log(data);
     }  
      }
        }> Click me</StyledButton>
      <StyledButton onClick={async()=>{
        const response  = fetch("http://localhost:8080/getusers",{
          method:"POST",
      mode:'cors',
      credentials:"include",
        })
     if(response.ok){
      const data = await response.JSON();
      console.log(data);
     }  
      }
        }> Click me</StyledButton>
    
    </>
  )
}
function Signup({handleSignup,setdisplay}){
  const [step , setstep ] = useState(1)
  const nextStep = () => setstep(step + 1);
  const prevStep = () => {
     if(step == 1){
      setstep(1)
     }
     else{

       setstep(step - 1);
    }
  }
  const [name,setname] = useState("");
  const [username , setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [message,setmessage] = useState("");
   useEffect(()=>{
    if(password != password2) {
      setmessage("password not matching")
    }
    else{
      if(password.length && password2.length)
      setmessage("password matched")
    }
  },[password2])
 async function handlesubmit(){

   try{
    const response = await fetch("http://localhost:8080/api/v1/signup",{
      method:"POST",
      credentials:"include",
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({name:name,username:username,email:email,password:password})
    })
    const data = await response.json()
    if(!response.ok){
      console.log(data)
    
    }
    {
      handleSignup(1)
      console.log(data)
    }
    
   }
   catch(err){
    console.log(err);
   }
  }
  return(
    <StyledContainer>
    <StyledLabel>Sign up with Root</StyledLabel>
      <StyledHeader>SignUp</StyledHeader>
      <StyledFrom onSubmit={handlesubmit}>
      {step <= 1 && (<>
        <StyledInput placeholder="name" 
        onChange={(e)=>{
          setname(e.target.value);
        }}
        
        required/>
      <StyledInput placeholder="username"
      onChange={(e)=>{
        setusername(e.target.value);
      }}
      required />
      <StyledButton type='submit' onClick={nextStep}>Next</StyledButton>
      <StyledButton type='submit' onClick={prevStep}>Previous</StyledButton>
      </>)}
      {step === 2 && (<>
        <StyledInput type="email" placeholder="email" 
        onChange={(e)=>{
          setemail(e.target.value);
        }}
        required />
       <StyledButton type='submit' onClick={nextStep}>Next</StyledButton>
      <StyledButton type='submit' onClick={prevStep}>Previous</StyledButton>
      </>)}
      {step === 3 && (<>
        <StyledInput type="password" placeholder="password" 
        onChange={(e)=>{
          setpassword(e.target.value);
        }}
        required />
        <StyledInput type="password" placeholder="re-enter password" 
        onChange={(e)=>{
          setpassword2(e.target.value);
        }}
        required />
        <span>{message}</span>
        <StyledButton type='submit' onClick={prevStep}>Previous</StyledButton>
      <StyledButton type='submit'>Signup</StyledButton>
      </>)}
      </StyledFrom>
      
    </StyledContainer>
  )
}
function ChooseAccountTable({data}){
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const redirect_uri = params.get("redirect_uri");
  console.log(redirect_uri)
  const handlesubmit = async(data)=>{
    if(!redirect_uri){
      console.log("working")
      router.push("/dashboard")
    }
    else{
    try{
      const response = await fetch('http://localhost:8080/api/v1/getauthcode',{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:data.email})

      })
      if(!response.ok){
       alert("something went wrong")
      }
      else{
       const data  = await response.json();
           const params ={
         code:data,
           }
       window.location.href = `${redirect_uri}?${new URLSearchParams(params)}`
      }
   }catch(err){

   }
  }
  }
  return (
    <>
    <StyledContainer>
    <StyledLabel>Sign up with Root</StyledLabel>
      <StyledHeader>Choose Account</StyledHeader>
      <StyledBox>
        <StyledTile onClick={()=>{
          handlesubmit(data);
        }}>
          <span className="tileUsername">{data.username}</span>
          <span className="tileEmail">{data.email}</span>
        </StyledTile>


      </StyledBox>
    </StyledContainer>
    </>
  )
}