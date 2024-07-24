import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API requests
import {  useNavigate } from "react-router-dom"

const useCachedData = (endpoint, deps = [], loadData) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
        if (!loadData) return;
      setError(null);
        setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Assuming token for authorization
          },
        });
        if(response.status === 200) {
            setData(response.data);
        }
        
      } catch (error) {
        if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message.includes("No data found")
          ) {
            setError(true)
          }
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token")
            navigate("/login", {
              state: { message: "Your session has expired. Please login again." },
            })
          }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...deps, loadData]);

  return [data, isLoading, error];
};

export default useCachedData;