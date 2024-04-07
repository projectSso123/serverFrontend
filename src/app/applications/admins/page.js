

const Admins = () => {
  return (
    <div className="w-full h-auto">

        <div class=" w-full flex min-h-screen  px-3  bg-white">
            
            <div class="w-full p-6  px-0">
                
                <table class="w-full min-w-max table-auto text-left">
                    
                    <thead>
                        <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">S.No</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Name</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Created</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Role</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Edit</p>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                        Array(10).fill(0).map((dets,i)=>(
                            <tr key={i}>
                                <td class="p-4 border-b border-blue-gray-50">
                                    <div class="flex items-center gap-3">
                                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{i+1}</p>
                                    </div>
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Rohan Baghel</p>
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Wed 3:00pm</p>
                                </td>
                                
                                <td class="p-4 border-b border-blue-gray-50">
                                    <div class="w-max">
                                        <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md" >
                                            <span class="">Admin</span>
                                        </div>
                                    </div>
                                </td>
                                
                                {/* edit button */}
                                <td class="p-4 border-b border-blue-gray-50">
                                <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                    <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                        </svg>
                                    </span>
                                </button>
                                </td>
                            </tr>
                        ))
                    }  
                    </tbody>
                    
                </table>
                
            
            </div>

        </div>
        
    </div>
  )
}

export default Admins