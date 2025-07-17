import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useSearchMovieQuery = (keyword, options = {}) => {
return useQuery({
  queryKey: ['movie-search', keyword],
  queryFn: () => api.get(`/search/movie?query=${keyword}`),
  ...options,
  enabled: !!keyword

})
}