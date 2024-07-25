import { useState } from "react";
import Form from "../../ui/Form";
import { useCollectionsList } from "../../context/SearchCollection";
import { useParams } from "react-router-dom";
function SearchCollections() {
  const [query, setQuery] = useState("");
  const { search } = useCollectionsList();
  const { id } = useParams();
  function handleSubmit(e) {
    e.preventDefault();

    search(query, id);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        id="keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        placeholder="Search collections..."
      />
    </Form>
  );
}

export default SearchCollections;
