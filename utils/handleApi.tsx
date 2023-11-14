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
export const getMoviesUpcoming = async () => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/upcoming`,
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
export const getMoviesTopRated = async () => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/top_rated`,
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
  // console.log(id);
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getRecommendations = async (id: number) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
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
export const getSimilar = async (id: number) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/similar`,
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
//search movies
export const getMovies = async (query: string) => {
  console.log(query);
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${query}`,
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
export const getMoviesByGenre = async (id: number) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
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
