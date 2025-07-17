import React from 'react';
import { useGenreListQuery } from '../../../hook/UseGenreList';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdOutlineHideImage } from "react-icons/md";

const genreKoMap = {
  Action: '액션',
  Adventure: '모험',
  Animation: '애니메이션',
  Comedy: '코미디',
  Crime: '범죄',
  Documentary: '다큐멘터리',
  Drama: '드라마',
  Family: '가족',
  Fantasy: '판타지',
  History: '역사',
  Horror: '공포',
  Music: '음악',
  Mystery: '미스터리',
  Romance: '로맨스',
  'Science Fiction': 'SF',
  'TV Movie': 'TV 영화',
  Thriller: '스릴러',
  War: '전쟁',
  Western: '서부',
};

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data } = useGenreListQuery();
  const genreList = data?.data?.genres || [];

  // 포스터 경로 조건
  const imageUrl = movie.poster_path 
    ? `https://media.themoviedb.org/t/p/w500${movie.poster_path}` 
    : null;
  //장르 이름 매칭
  const genreNames = genreList
    .filter(g => movie.genre_ids?.includes(g.id))
    .map(g => (
      <span key={g.id} className="genre">
        {genreKoMap[g.name] || g.name}
      </span>
    ));

  return (
    <div>
      <Card className='movie-card-wrap'>
        <div
          className='movie-card'
          style={{ 
            height: '380px',
            backgroundColor: '#212529',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {!movie.poster_path && (
            <MdOutlineHideImage
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '80px',
                pointerEvents: 'none',
                userSelect: 'none',
                opacity : '.8',
                color: '#fff'
              }}
            />
          )}
          <div className="overlay">
            <div className="text-wrap">
              <h5 className='adult'>
                {movie.adult ? '청소년관람불가' : '전체연령가'}
              </h5>
              <h5 className='vote_average'>
                평점 : {movie.vote_average.toFixed(1)}
              </h5>
              <h5 className='genre'>
                <p>장르</p>
                <div className="span-wrap">
                  {genreNames}
                </div>
              </h5>
              <p className='overview'>{movie.overview}</p>
            </div>
          </div>
        </div>
        <h5 className='card-title'>{movie.title}</h5>
      </Card>
    </div>
  );
};

export default MovieCard;
