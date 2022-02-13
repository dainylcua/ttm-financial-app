interface Props {
  setSearchState: Function
  handleChange: Function
}

const SearchBar: React.FC<Props> = ({setSearchState, handleChange}) => {
  return (
    <div className="flex flex-col max-w-full px-1 mx-auto">
      <input
        onFocus={() => setSearchState(true)}
        // onBlur={() => setTimeout(() => setSearchState(false), 300)}
        className="h-8 px-4 py-1 bg-gray-100 border rounded-lg ring-1 ring-sky-600" 
        placeholder="Search for Users"
        onChange={(e) => handleChange(e)}
      /> 
    </div>
  )
}

export default SearchBar