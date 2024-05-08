import Link from "next/link"


const Header = () => {
    
    return (
      <div className="fixed z-[9] top-0 right-0 border-b border-black  w-full h-[15vh] flex justify-evenly gap-[50vw] bg-white {
        #ffffffbc
      }] ">
          <Link href={"/dashboard"}>          
          <div className="h-full " >
              <img src="https://mp.gov.in/assets/img/mp-logo-hin.png" alt="logo" className="h-[70px]" />
          </div>
          </Link>

          <div className="h-full ">
              <img src="https://mp.gov.in/assets/img/ashok.png" alt="" className=" h-[70px] " />
          </div>
          
      </div>
    )
  }
  
  export default Header