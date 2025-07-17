import React, { useEffect, useState } from 'react';
/* 부트스트랩 */
import { useSearchParams } from 'react-router-dom';
import Select, { Option } from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-select/assets/index.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
/* 컴포넌트 */
import MovieCard from '../homepage/MovieCard/MovieCard';
/* 훅(데이터 가져오기) */
import { useAllMoviesQuery } from '../../hook/useAllMoviesQuery';
import { useSearchMovieQuery } from '../../hook/useSearchMovieQuery';

const MoviePage = () => {
  const [sortBy, setSortBy] = useState('popularity.desc'); // 기본 정렬: 인기순
  const [genre, setGenre] = useState(''); // 기본 장르: 전체
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [query] = useSearchParams();
  const keyword = query.get('keyword')?.trim();

  const { data: allData, isLoading, isError } = useAllMoviesQuery(sortBy, genre);
  const { data: searchData, isLoading: isSearchLoading, isError: isSearchError } = useSearchMovieQuery(keyword);

  const moviesToShow = keyword ? searchData?.data?.results ?? [] : allData ?? [];

  const total = moviesToShow.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = moviesToShow.slice(startIndex, startIndex + itemsPerPage);

  const genreIdToKorean = {
    28: '액션', 12: '모험', 16: '애니메이션', 35: '코미디', 80: '범죄',
    99: '다큐멘터리', 18: '드라마', 10751: '가족', 14: '판타지', 36: '역사',
    27: '공포', 10402: '음악', 9648: '미스터리', 10749: '로맨스', 878: 'SF',
    10770: 'TV 영화', 53: '스릴러', 10752: '전쟁', 37: '서부'
  };

  // 정렬이나 필터가 바뀌면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, genre, keyword]);

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  if (isError || (keyword && isSearchError)) return <p>❌ 에러 발생!</p>;
  if (keyword && moviesToShow.length === 0) return <p>검색 결과가 없습니다: "{keyword}"</p>;
  if (!keyword && moviesToShow.length === 0) return <p>영화 데이터가 없습니다.</p>;

  return (
    <div className="movie-page">
      <h1 className="page-title">
        {keyword ? `"${keyword}" 검색 결과` : 'All Movies'}
      </h1>

      <div className="select-wrap">
        {/* 정렬 셀렉트 */}
        <Select value={sortBy} onChange={setSortBy} style={{ width: 200 }}>
          <Option value="popularity.desc">인기순</Option>
          <Option value="release_date.desc">최신순</Option>
          <Option value="vote_average.desc">평점순</Option>
          <Option value="original_title.asc">제목순</Option>
        </Select>

        {/* 장르 셀렉트 */}
        <Select value={genre} onChange={setGenre} style={{ width: 200 }}>
          <Option value="">전체</Option>
          {Object.entries(genreIdToKorean).map(([id, name]) => (
            <Option key={id} value={id}>{name}</Option>
          ))}
        </Select>
      </div>

      {/* 카드 리스트 */}
      <div className="movie-cards-wrap">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} className="movie-card" />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination-wrap">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={itemsPerPage}
          onChange={handlePaginationChange}
          prevIcon={<FaAngleLeft />}
          nextIcon={<FaAngleRight />}
          showLessItems={false} 
        />
      </div>
    </div>
  );
};

export default MoviePage;