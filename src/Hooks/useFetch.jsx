import React, { useCallback } from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(false);

  const request = useCallback(async (url, options) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok)
        throw new Error(
          `${json.status} - ${json.detail}` ||
            response.statusText ||
            "Erro desconhecido"
        );

      setData(json);

      return { response, data };
    } catch (error) {
      console.log("Error useFetch: ", error);
      console.log(error.message);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
