import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../ui/Form";
import { useState } from "react";

function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get("query") || "";

  const [query, setQuery] = useState(queryString);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/search?query=${query}`);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        id="keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        placeholder="Enter your keywords..."
      />
    </Form>
  );
}

export default SearchForm;
