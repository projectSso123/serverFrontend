import Link from "next/link"


const ApplicationCard = () => {
  return (
    <div class="w-[25vw]  text-center">
        <Link href="/applications/">
            <div
                class="object-cover object-center w-full h-48 mx-auto hover:rounded-lg hover:shadow-lg border-2 border-green-200 hover:border-gray-500 bg-white ">
                <div class="py-16 px-4">
                    <h5 class="text-lg font-bold text-black">mp.gov.in</h5>
                    <span class="mt-1 font-medium text-sm text-gray-600">state website</span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ApplicationCard
