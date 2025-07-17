import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieTrailer = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieTrailer = (movieId) => {
  return useQuery({
    queryKey: ['movie-trailer', movieId],
    queryFn: () => fetchMovieTrailer(movieId),
  });
};