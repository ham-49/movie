import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchNowPlayingMovies = () => {
  return api.get("/movie/now_playing");
};

export const useNowPlayingMoviesQuery=()=>{
  return useQuery({
    queryKey:['movie-now-playing'],
    queryFn:fetchNowPlayingMovies
  })
}