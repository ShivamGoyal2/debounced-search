
import { useEffect, useState } from "react";

const useFetchData = (input) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setIsError(false);

    fetch(
      `https://dummyjson.com/recipes/search?q=${encodeURIComponent(input)}`,
      {
        signal: controller.signal,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("API request failed");
        }

        return res.json();
      })
      .then((data) => {
        if (!controller.signal.aborted) {
          setRecipes(data?.recipes || []);
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        setIsError(true);
        setRecipes([]);
        console.error(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      console.log("Aborting previous request:", input);
      controller.abort();
    };

  }, [input]);

  const hasInput = Boolean(input.trim());

  return [
    hasInput ? recipes : [],
    hasInput && isLoading,
    hasInput && isError,
  ];
};

export default useFetchData;
