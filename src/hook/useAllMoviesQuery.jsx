import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchAllMovies = async (sortBy, genreId) => {
  let allResults = [];
  const maxPages = 5; // 5페이지 100개 불러옴
  for (let page = 1; page <= maxPages; page++) {
    // 장르 필터가 있으면 with_genres 파라미터 추가
    const url = genreId
      ? `/discover/movie?page=${page}&sort_by=${sortBy}&with_genres=${genreId}`
      : `/discover/movie?page=${page}&sort_by=${sortBy}`;

    const res = await api.get(url);
    allResults.push(...res.data.results);
  }
  return allResults;
};

/* 인기순 초기값으로 설정 후 정렬값과 장르에 따라 데이터 반환 */
export const useAllMoviesQuery = (sortBy = 'popularity.desc', genreId = '') => {
  return useQuery({
    queryKey: ["all-movies", sortBy, genreId],
    queryFn: () => fetchAllMovies(sortBy, genreId),
    staleTime: 1000 * 60 * 10, // 10분 갱신
  });
};
