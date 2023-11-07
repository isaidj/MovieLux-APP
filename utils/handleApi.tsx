import axios from "axios";

const key = process.env.EXPO_PUBLIC_API_KEY;
const access_token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;

export const getMoviesTrending = async () => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/day`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.request(options);
    //   console.log(response.data);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
interface getMoviesPopularParams {
  language?: string;
  page?: number;
  region?: string;
}

export const getMoviesPopular = async ({
  language = "en-US",
  page = 1,
  region = "US",
}: getMoviesPopularParams = {}) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.request(options);
    //   console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMovie = async (id: number) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.request(options);
    //   console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
