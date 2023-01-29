import { useState } from 'react';

function useFetch() {
  const [planets, setPlanets] = useState([]);
  const handleFetch = async (url) => {
    const firstFetch = await fetch(url);
    const response = await firstFetch.json();
    setPlanets(response);
    return response;
  };
  return {
    planets, handleFetch,
  };
}

export default useFetch;
