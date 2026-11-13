import { useEffect, useState } from "react";

const useFetchData = (input) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    
      fetch(`https://dummyjson.com/recipes/search?q=${input}`)
      .then((res) => {
        return res.json()
      })
      .then((data)=>{
        setRecipes(data?.recipes);
      })
  }, [input]);
  console.log('recipes', recipes);
  

  return recipes;
};
export default useFetchData;
