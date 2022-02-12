import { useEffect, useState } from "react"

interface Props {
  children?: React.ReactNode,
}

const SearchBar: React.FC<Props> = () => {
  return (
    <div className="flex flex-col w-full px-1 mx-auto">
      <input 
        className="h-8 px-4 py-1 bg-gray-100 border rounded-lg ring-1 ring-sky-600" 
        placeholder="Search for Users"
      /> 
    </div>
  )
}

export default SearchBar