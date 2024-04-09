import Link from "next/link"


const BroadcastSidebar = () => {
  return (
    <div className=" fixed mt-[15vh] w-[16vw] h-[85vh] border-r-2 flex flex-col items-center bg-white py-3 gap-3 ">

        <Link href={"/broadcast/addNews"} className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Add News 
        </Link>

        <Link href={"/dashboard/application"}  className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Add Banner
        </Link>

        <Link href={"/broadcast"}  className="px-3 py-2 rounded-md  hover:bg-green-800 transition-all w-[150px] hover:text-white font-semibold ">
            Add Notifications 
        </Link>

        
        
    </div>
  )
}

export default BroadcastSidebar