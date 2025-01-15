import React, { useState } from 'react'

const Search = ({searchItem}) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (query.trim()) {
            searchItem(query);
        }
    };

    return (
        <>
            <div className=' z-50 w-full py-2 sticky top-0 bg-white'>

                <div className="max-w-md mx-auto    " >
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" value={query} onChange={(e)=>handleInputChange(e)} id="default-search" className="block outline-none w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER YOUR SEARCH TERM..." required />
                        <button onClick={(e)=>handleSubmit(e)}   className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search
