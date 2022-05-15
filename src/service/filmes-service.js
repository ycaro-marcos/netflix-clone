import axios from "axios";

const API_KEY = 'f03e769cbd0453b7b64b720e5cce84d0';
const API_BASE = 'https://api.themoviedb.org/3';
const http = axios.create({
  baseURL: API_BASE,
})


const getItems = async (endpoint) => {
  const req = await http.get(`${endpoint}`, {});
  return req;
}


export const getMovieList = async () => {
  return [
    {
      slug: 'originals',
      title: 'Originais do Netflix',
      items: await getItems(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
    },
    {
      slug: 'trending',
      title: 'Recomendados para Você',
      items: await getItems(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)

    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await getItems(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)

    },
    {
      slug: 'action',
      title: 'Ação',
      items: await getItems(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)

    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await getItems(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)


    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await getItems(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)


    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await getItems(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)

    },
    {
      slug: 'documentary',
      title: 'documentários',
      items: await getItems(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)


    },
  ];
}
