import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchMovies = ({
  endpoint,
  timeN,
}: {
  endpoint: string;
  timeN?: string;
}) => {
  const [movies, setMovies] = useState([]);
  const [time, setTime] = useState(timeN);

  const getMovies = async () => {
    const access_token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
    console.log(`https://api.themoviedb.org/3/${endpoint}/${time}`);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${endpoint}/${time}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const response = await axios.request(options);
      //   console.log(response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, [time]);
  return { movies, time, setTime };
};

export default useFetchMovies;
