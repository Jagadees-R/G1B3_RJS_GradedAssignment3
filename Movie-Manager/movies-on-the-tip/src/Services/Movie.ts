import axios from "axios";
import IMovie from "../Model/IMovie";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getMovies = (category: string) => {
  return axios.get<IMovie[]>(`${baseUrl}/${category}`)
    .then(response => response.data)
};

const getMoviesById = (category: string, id: number | string) => {
  return axios.get<IMovie>(`${baseUrl}/${category}/${id}`)
    .then(response => response.data)
};

const checkMovie = (title: string) => {
  return axios.get<IMovie>(`${baseUrl}/favourite/?title=${title}`)
    .then(response => response.data)
};

const addMovieToFavourite = async (movie: Omit<IMovie, 'id'>) => {
  const response = await axios.post<IMovie>(
    `${baseUrl}/favourite`,
    movie,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  return response.data;
};

const removeMovieFromFavourite = async (id: number | string) => {
  const response = await axios.delete(`${baseUrl}/favourite/${id}`);
  return response.data;
};

export {
  getMovies,
  getMoviesById,
  checkMovie,
  addMovieToFavourite,
  removeMovieFromFavourite
};