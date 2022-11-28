import { useState, useEffect } from "react";

function useFetch(url) {
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const categoirestab = [];
        for (const key in data) {
          const cat = {
            id: key,
            ...data[key],
          };
          categoirestab.push(cat);
        }
        // console.log(categoirestab);
        setLoadedCategories(categoirestab);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [url]);
  return [loadedCategories, error, loading];
}
export default useFetch;
