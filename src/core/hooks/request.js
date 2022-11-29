import {useState} from 'react';

export const useRequest = call => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = () => {
    setLoading(true);
    call()
      .then(res => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {response, loading, error, execute};
};
