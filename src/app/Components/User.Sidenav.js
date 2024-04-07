import Link from "next/link"


const Sidenav = () => {
  return (
    <div className=" fixed mt-[15vh] w-[16vw] h-[85vh] border-r-2 flex flex-col items-center bg-white py-3 gap-3 ">

        <Link href={"/dashboard/profile"} className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Profile 
        </Link>

        <Link href={"/applications"}  className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Registered application
        </Link>

        <Link href={"/dashboard"}  className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Title 
        </Link>

        {/* <button className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Links
        </button> */}
        
    </div>
  )
}

export default Sidenav