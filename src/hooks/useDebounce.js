import { useEffect, useState } from "react";

const useDebounce = (value, d) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, d);

    return () => {
      clearTimeout(timer);
    };
  }, [value, d]);

  return debouncedValue;
};
export default useDebounce;
