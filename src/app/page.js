"use client"
import { ThemeProvider } from "styled-components";
import StyledContainer, { StyledButton, StyledFrom, StyledInput, StyledLabel } from '../styled.component/form.styledcomponent.js'
import { StyledHeader } from "../styled.component/form.styledcomponent.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StyledBox } from "../styled.component/form.styledcomponent.js";
import { StyledTile } from "../styled.component/form.styledcomponent.js";
import toast, { Toaster } from 'react-hot-toast';
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
  const [clientData , setclientData] = useState()
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
        setclientData(obj)
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
    <>
    
    {
      userAccountData  ?    <ChooseAccountTable data={userAccountData} clientData={clientData} setdisplay={setdisplay}>
  
      </ChooseAccountTable> : display === 2 ? <Signup handleSignup={handleSignup} setdisplay={setdisplay}></Signup> :display === 1 && <Login setdisplay={setdisplay} setLoggedin={setLoggedin} ></Login>
    }
   
    </>
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
    console.log(e.target.name)
    setcredential({...credential, [e.target.name]: e.target.value});
    }
  
  
  const submithandler = async()=>{

    const tid = toast.loading("Logging in")
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
    const data = await response.json()
    if(!response.ok){
      
      toast.dismiss(tid);
      toast.error(data.message);
      
    }
    else{
      toast.dismiss(tid)
      toast.success("Logged in")
      setTimeout(() => {
        setLoggedin(true)
      }, 3000);
    
    }
    }
    catch(err){
      toast.dismiss(tid)
      toast.error(err)
   
    }
  }
  return(
    <>
    {/* <StyledContainer>
    <StyledLabel>Sign up with Root</StyledLabel>
      <StyledHeader>Login</StyledHeader>
    <StyledFrom>
      <StyledInput placeholder="email" name="email" onChange={changehandler}></StyledInput>
      <StyledInput placeholder="password" name="password" onChange={changehandler}></StyledInput>

      <StyledButton onClick={submithandler}>Login</StyledButton>
      <StyledButton onClick={()=>{
        setdisplay(2);
      }}>SignUp</StyledButton>
      </StyledFrom>
    </StyledContainer> */}
    <Toaster></Toaster>
    <Tamplate content1={"Login To Your Account"} content2={"Root"}>
    <label name="email" className="text-sm mt-4 text-blue-500 font-bold">Email</label>
        <input type="email" name="email" placeholder="abx@" 
        onChange={changehandler}
        className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required
        />
        <label name="password" className="text-sm mt-4 text-blue-500 font-bold">Password</label>
        <input name="password"type="password" placeholder="" 
        onChange={changehandler}
        className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required
        />
        <button type="submit" 
        onClick={(e)=>{
          e.preventDefault();
          submithandler();
        }}
        className="shadow-lg rounded-sm mt-4 w-full p-2 bg-blue-400 font-bold text-white text-xl">Login</button>
        <label className="text-sm text-blue-500 font-bold">Create new account <sapn onClick={()=>setdisplay(2)}>SignUp</sapn></label>
    
    </Tamplate>
     
    
    </>
  )
}
function Signup({handleSignup,setdisplay}){
  
  const [name,setname] = useState("");
  const [username , setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [message,setmessage] = useState("");
  const [clientid ,setclientid] = useState("")
   useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const client_id = urlParams.get('client_id');
    
    setclientid(client_id);
   },[])
   useEffect(()=>{
    if(password != password2) {
      setmessage("password not matching")
    }
    else{
      if(password.length && password2.length)
      setmessage("password matched")
    }
  },[password2])
 async function createEditor(data){
  if(clientid){
    try{
      const response  = fetch("http://localhost:8080/api/v1/addeditor",{
        method:"POST",
        mode:'cors',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({userid:data._id,clientid:clientid})
      })
      if(!response.ok){
        console.log(response)
      }
    }
    catch(err){
      console.log(err)
    }
  }
 }
 async function handlesubmit(){
   const tid = toast.loading('Processing');
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
      toast.dismiss(tid)
      toast.error(data?.message)
    }
    else
    { 
      toast.dismiss(tid)
      toast.success("Account Created")
      createEditor(data);
      setTimeout(() => {
        setdisplay(1)
      },3000);
    }
    
   }
   catch(err){
    toast.dismiss(tid)
    toast.error(err.message)
    console.log(err);
   }
  }
  return(
    // <StyledContainer>
    // <StyledLabel>Sign up with Root</StyledLabel>
    //   <StyledHeader>SignUp</StyledHeader>
    //   <StyledFrom onSubmit={(e)=>{
    //     e.preventDefault();
    //     handlesubmit()
    //   }}>
    //   {step <= 1 && (<>
    //     <StyledInput placeholder="name" 
    //     onChange={(e)=>{
    //       setname(e.target.value);
    //     }}
        
    //     required/>
    //   <StyledInput placeholder="username"
    //   onChange={(e)=>{
    //     setusername(e.target.value);
    //   }}
    //   required />
    //   <StyledButton type='submit' onClick={nextStep}>Next</StyledButton>
    //   <StyledButton type='submit' onClick={prevStep}>Previous</StyledButton>
    //   </>)}
    //   {step === 2 && (<>
    //     <StyledInput type="email" placeholder="email" 
    //     onChange={(e)=>{
    //       setemail(e.target.value);
    //     }}
    //     required />
    //    <StyledButton type='submit' onClick={nextStep}>Next</StyledButton>
    //   <StyledButton type='submit' onClick={prevStep}>Previous</StyledButton>
    //   </>)}
    //   {step === 3 && (<>
    //     <StyledInput type="password" placeholder="password" 
    //     onChange={(e)=>{
    //       setpassword(e.target.value);
    //     }}
    //     required />
    //     <StyledInput type="password" placeholder="re-enter password" 
    //     onChange={(e)=>{
    //       setpassword2(e.target.value);
    //     }}
    //     required />
    //     <span>{message}</span>
    //     <StyledButton  onClick={prevStep}>Previous</StyledButton>
    //   <StyledButton type='submit'>Signup</StyledButton>
    //   </>)}
    //   </StyledFrom>
      
    // </StyledContainer>
    <>
    <Toaster></Toaster>
    <Tamplate content1={"Create Account On"} content2={"Root"}>
    <label className="text-sm mt-4 text-blue-500 font-bold" name="namelabel">Full name</label>
        <input type="text" name="name" 
        onChange={(e)=>setname(e.target.value)}
        placeholder="Anonymus" className="shadow-lg p-1 border border-solid placeholder:text-sm placeholder:ml-2 border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required
        />
        <label
        name="username" 
        className="text-sm mt-4 text-blue-500 font-bold"> Username</label>
        <input
         name="username"
         onChange={(e)=>setusername(e.target.value)}
         type="text" placeholder="abc123" className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
         required
         />
        <label name="email"
         className="text-sm mt-4 text-blue-500 font-bold">Email</label>
        <input 
        name="email"
        onChange={(e)=>setemail(e.target.value)}
        type="email" placeholder="abx@" className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required
        />
        <label name="password"
        className="text-sm mt-4 text-blue-500 font-bold">Password</label>
        <input 
        name="password"
        onChange={(e)=>setpassword(e.target.value)}
        type="password" placeholder="" className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required/>
      <label name="password"
        className="text-sm mt-4 text-blue-500 font-bold">Confirm password</label>
        <input name="password" 
        onChange={(e)=>setpassword2(e.target.value)}
        type="password" placeholder="" className="shadow-lg p-1 border border-solid border-slate-300 rounded-md  focus:shadow-sm focus:outline focus:outline-2   focus:outline-blue-400"
        required
        />
    <button
        onClick={(e)=>{
         
   e.preventDefault()
          handlesubmit()
        }} 
        type="submit" className="shadow-lg  rounded-sm mt-4 w-full p-2 bg-blue-400 font-bold text-white text-xl">Sign-Up</button>
        <label className="text-sm text-blue-500 font-bold">Already Have an Account <sapn onClick={()=>setdisplay(1)}>Login</sapn></label>
    </Tamplate>
    </>
  )
}
function ChooseAccountTable({data,clientData,setdisplay}){
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const redirect_uri = params.get("redirect_uri");
  console.log(redirect_uri)
  const handlesubmit = async(data)=>{
    if(!redirect_uri){
     
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
      body:JSON.stringify(clientData)

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
{/* <StyledContainer>
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
    </StyledContainer> */}
    <Tamplate content1={"Choose You Account"} content2={"Root"}>
    <div className="w-full flex gap-2 justify-center flex-col items-center ">
      <div onClick={()=>{handlesubmit(data)}}
      className="w-40 h-16 rounded-md shadow-md p-2 bg-blue-400 text-white flex flex-col justify-center transition transform active:scale-95">
      <span className="font-bold  ">{data.username}</span>
      <span className="font-bold ">{data.email}</span>
      </div>
      <div onClick={()=>{setdisplay(1)}}
      className="w-40 h-16 rounded-md shadow-xl p-2 flex flex-col justify-center  transition transform active:scale-95">
     
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-400" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

       <label className="font-bold text-sm text-blue-400"> Different Account </label>

      </div>
    </div>
    </Tamplate>
    </>
  )
}
function Tamplate({content1,content2,children}){
return(
  <div className=" mt-8 SignUpMainBox w-4/5 h-4/5 bg-white mx-auto shadow-2xl flex justify-center rounded-lg max-sm:flex-col max-sm:w-full max-sm:h-screen  max-sm:mt-0">
  <div className="SideBox w-2/5 h-full flex relative bg-blue-400 max-sm:w-full max-sm:h-52">
   <div className="absolute p-5 top-1/3 text-white max-sm:top-1">
   <h2 className="text-start text-4xl ">
    {content1}
    </h2>
    <h1 className="text-start text-4xl font-bold">
      {content2}
    </h1>

   </div>
   

  </div>
  <div className="FormBox w-3/5 h-full max-sm:w-full">
   <form className="SignUpForm flex w-full h-full items-center justify-center flex-col ">
   <div className="flex w-2/4  flex-col max-lg:w-5/6">
   {children}
    </div>
  
   </form>
  </div>
</div>
)
}