import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = (movieId) => {
  return api.get(`/movie/${movieId}/reviews`);
};
export const useMovieReviews = (movieId) => {
  return useQuery({
    queryKey: ['movie-reviews', movieId],
    queryFn: () => fetchMovieReviews(movieId),
  });
};