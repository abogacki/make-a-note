import { fetchApi } from "api";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const useFetchApi = <T>(path: string, init?: RequestInit) => {
  const { noteId } = useParams<{ noteId: string }>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const handleError = useCallback(
    (error: any) => {
      switch (error.status) {
        case 403:
          history.push(`/notes/${noteId}/token`);
          break;
        default:
          setError(error);
      }
    },
    [history, noteId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchApi(path, init);
        setData(response);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchApi;
