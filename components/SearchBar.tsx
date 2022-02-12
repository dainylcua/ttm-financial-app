interface Props {
  setSearchState: Function
  setQuery: Function
  query: string
}

const SearchBar: React.FC<Props> = ({setSearchState, setQuery, query}) => {

  return (
    <div className="flex flex-col w-full px-1 mx-auto">
      <input
        onFocus={() => setSearchState((prevState: boolean) => !prevState)}
        onBlur={() => setSearchState((prevState: boolean) => !prevState)}
        className="h-8 px-4 py-1 bg-gray-100 border rounded-lg ring-1 ring-sky-600" 
        placeholder="Search for Users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> 
    </div>
  )
}

export default SearchBar