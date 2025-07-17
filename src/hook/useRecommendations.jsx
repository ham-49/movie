import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendations = (movieId) => {
  return api.get(`/movie/${movieId}/recommendations`);
};
export const useRecommendations = (movieId) => {
  return useQuery({
    queryKey: ['movie-recommendations', movieId],
    queryFn: () => fetchRecommendations(movieId),
  });
};