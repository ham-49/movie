import React from 'react';
import { useEffect } from 'react';
import { usePopularMoviesQuery } from '../../../hook/usePopularMovies';
import { useGenreListQuery } from '../../../hook/UseGenreList';
import { useMovieTrailer } from '../../../hook/useMovieTrailer';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlinePlayCircle } from "react-icons/md";

const Banner = () => {
  /* 모달열고 닫기 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //인기영화 정보 data로 가져오기
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.data?.results?.[0];
  
  //아이값 들고오기 
  const movieId = movie?.id;
  // 영화의 예고편 데이터 가져오기
  const trailerQuery = useMovieTrailer(movieId,{
    enabled: !! movieId
  });
  // console.log('트레일러내용', trailerQuery.data);
  if (isLoading) return <h2>로딩중</h2>;
  if (isError) return <h2>{error.message}</h2>;
  const trailerKey = 
  trailerQuery.data?.data?.results.find(
    (video) => video.type === 'Trailer' && video.official === true
  );
  console.log(trailerKey)
  //장르 
  // 장르 문자 변환
const genreMap = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부'
};
// 장르 ID 배열
  let access = data.data.results[0];
  let genreIds = access.genre_ids;
// 장르 이름 배열로 변환
  let genreNames = genreIds.map(id => genreMap[id] || 'Unknown');
  return (
    <div className='banner' 
    style={{backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.data.results[0].backdrop_path})`}}>
      <div className="text-wrap">
        <h1 className='big-title'> Movie of The Day </h1>
        <h2 className='title'>
        {access.title}
      </h2> 
      <p className='release-date'>
        개봉일 : 
        {access.release_date}
      </p>
      <p className='overview'>
        {access.overview}
      </p>
      <p className='vote-average'>
        평점 : 
        {access.vote_average.toFixed(1)}
      </p>
      <div className='genres'>
        <p>장르</p> {genreNames.map((name, index) => (
          <span key={index} className="genre-item">{name}</span>
        ))}
      </div>
      <Button onClick={handleShow} className='trailer-btn'>
        Trailer<MdOutlinePlayCircle />
      </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation={false}
        className="modal-box"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey ?
          ( <iframe src={
            `https://www.youtube.com/embed/${trailerKey.key}`
          } frameborder="0" className='movie_trailer'></iframe>)
          :(
            <p>예고편 없음</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Banner