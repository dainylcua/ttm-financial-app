interface Props {
  setSearchState: Function
  handleChange: Function
}

const SearchBar: React.FC<Props> = ({setSearchState, handleChange}) => {
  return (
    <div className="flex flex-col max-w-full px-1 mx-auto">
      <input
        onFocus={() => setSearchState((prevState: boolean) => true)}
        onBlur={() => setSearchState((prevState: boolean) => false)}
        className="h-8 px-4 py-1 bg-gray-100 border rounded-lg ring-1 ring-sky-600" 
        placeholder="Search for Users"
        onChange={(e) => handleChange(e)}
      /> 
    </div>
  )
}

export default SearchBar