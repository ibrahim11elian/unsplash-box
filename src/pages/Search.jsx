import SearchForm from "../features/search/Search";
import SearchResult from "../features/search/SearchResult";

function Search() {
  return (
    <>
      <div className="h-24 bg-[url('/gradient-bg.svg')] bg-cover bg-no-repeat"></div>
      <div className="flex -translate-y-7 justify-center">
        <SearchForm />
      </div>

      <SearchResult />
    </>
  );
}

export default Search;
