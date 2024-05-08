"use client"
import Link from "next/link"
import Cookies from "js-cookie"

const ApplicationCard = ({obj}) => {
console.log(obj)
  return (
    <div class="w-[25vw]  text-center" onClick={()=>{
      console.log("working")
    Cookies.set("clientid",obj._id,{})
    }}>
        <Link href={`/applications/application_info`}>
            <div
                class="object-cover object-center w-full h-48 mx-auto hover:rounded-lg hover:shadow-lg border-2 border-green-200 hover:border-gray-500 bg-white ">
                <div class="py-16 px-4">
                    <h5 class="text-lg font-bold text-black">{obj.applicationname}</h5>
                    <span class="mt-1 font-medium text-sm text-gray-600">{obj.description}</span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ApplicationCard
