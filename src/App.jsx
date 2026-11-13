import { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import useDebounce from "./hooks/useDebounce";
import { ClipLoader } from "react-spinners";

function App() {
  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 1300);
  const [recipes, isLoading, isError] = useFetchData(debouncedInput);
  return (
    <>
      <h3>Debounce Search</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        {isLoading && <ClipLoader />}
        {isError && <h2>Page not found</h2>}
        {recipes.map((recipe) => (
          <p key={recipe.id}>Name: {recipe.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
