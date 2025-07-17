import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenres=()=>{
  return api.get(`/genre/movie/list`)
}

export const useGenreListQuery=()=>{
  return useQuery({
    queryKey:['movie-genres'],
    queryFn:fetchGenres
  })
}