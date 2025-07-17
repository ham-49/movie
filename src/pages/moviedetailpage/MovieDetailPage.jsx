import React , { useState } from 'react'
/* 부트스트랩 */
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Badge, Button, Modal, Card } from 'react-bootstrap';
import { MdOutlinePlayCircle } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
/* 슬라이드 */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
/* 컴포넌트 */
import MovieCard from '../homepage/MovieCard/MovieCard';
/* 훅(데이터 가져오기) */
import { useMovieDetail } from '../../hook/useMovieDetail'
import { useMovieReviews } from '../../hook/useMovieReviews';
import { useMovieTrailer } from '../../hook/useMovieTrailer';
import { useMovieCredits } from '../../hook/useMovieCredits';
import { useRecommendations } from '../../hook/useRecommendations';

const MovieDetailPage = () => {
  /* 주소에서 아이디 값 가져오기 */
  const { id } = useParams();
  /* 추천 영화 불러오기 */
  const {data : pickData} = useRecommendations(id);
  console.log('추천데이터',pickData)

  /* 크레딧 데이터 불러오기 */
  const {data : creditsData} = useMovieCredits(id);
  /* 크레딧 버튼 */
  const [showAll, setShowAll] = useState(false);
  /* 리뷰 데이터 불러오기 */
  const {data : reviewsData} = useMovieReviews(id);
  /* 디테일 데이터 가져오기 */
  const { data, isLoading, isError, error } = useMovieDetail(id);
  /* 트레일러 예고편 */
  const {data : trailerdata } = useMovieTrailer(id);
  /* 트레일러 모달 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const trailer = trailerdata?.data?.results?.find(
  (vid) =>
    (vid.type?.toLowerCase() === 'trailer' || vid.type?.toLowerCase() === 'teaser') &&
    vid.site?.toLowerCase() === 'youtube'
  );
  /* 슬라이드 반응형 */
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생: {error.message}</p>;

  const details = data?.data;//주소 단축 시키기
  const credits = creditsData?.data?.cast;
  const picks = pickData?.data?.results;

  if (!details) return <p>데이터가 없습니다.</p>;
  /* 장르 데이터 가져오기 */
  /* 장르 배열 */
  const genreIdToKorean = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부"
  };

  const genreNames = details.genres?.map(
    genre => genreIdToKorean[genre.id] || "기타"
  ) || [];
  return (
    <div className='detail-page'>
      {/* 상단 */}
      <div 
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path})`,
        }}
        className="movie-detail-back"
      >
        <Container className='movie-container'>
          <Row className='container-row'>
            <Col xs={12} md={4} className='img-col'>
              <img src={`https://media.themoviedb.org/t/p/w500${details.poster_path}`} alt={details.title} />
              
            </Col>
            <Col xs={12} md={8} className='info-col'>
              <p className='movie-sub-title'>{details.tagline}</p>
              <p className='movie-title'>{details.title}</p>
              <p className='movie-overview'>{details.overview}</p>
              <p>개봉일 : {details.release_date}</p>
              <div className="tag-wrap">
                <div className='adult'>{details.adult ? <span className='true'>청불</span> : <span className='false'>전연령</span>}</div>
                <div className='vote_average'>{details.vote_average?.toFixed(1)}</div>
              </div>
              <div className="genre-wrap">
                {genreNames.map((name, idx) => (
                  <span key={idx} className="genre-item" style={{ marginRight: '10px' }}>
                  {name}
                  </span>
                ))}
              </div>
              {trailer?(<Button className='trailer-btn' onClick={handleShow}>
                Trailer<MdOutlinePlayCircle />
              </Button>):<Button className='soon'>
                Coming Soon
              </Button>}
            </Col>
          </Row>
        </Container>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          animation={false}
          className="modal-box ratico ratio-16x9"
        >
          <Modal.Header closeButton closeVariant="white">
                  <Modal.Title>Trailer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {trailer ?
          ( <iframe src={ `https://www.youtube.com/embed/${trailer.key}` } frameborder="0" className='movie_trailer'></iframe>)
          :(
            <p>Coming Soon</p>
          )}
          </Modal.Body>
        </Modal>
      </div>
      {/* 등장인물 */}
      <Container className="character">
        <h2 className="content-title">Character</h2>
        <h5 className="sub-title"><span>{details.title}</span> Main Actor</h5>
        {credits?.length > 0 && (
          <div className="card-wrap">
            {credits?.length > 3 && (
                <div className="toggle-btn-wrap">
                  <Button
                    className='toggle-btn'
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? <FaMinus /> : <FaPlus />}
                  </Button>
                </div>
              )}
              {credits
              .slice(0, showAll ? credits.length : 4)
              .map((credit)=>(
                <Card key={credit.id} className='credit-card'>
                  {credit.profile_path? (<Card.Img
                  className='actor-img'
                  variant="top"
                  src={`https://media.themoviedb.org/t/p/w276_and_h350_face${credit.profile_path}`}
                  alt={credit.name} />):(<div className='img-none'><IoPersonSharp /></div>)}
                  <Card.Body>
                    <Card.Title className='character-name'>{credit.character}</Card.Title>
                    <Card.Title className='actor-name'>{credit.name}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
          </div>
        )}
      </Container>
      {/* 추천영화 */}
      <Container className="choice-list">
        <h2 className="content-title">Editor's Choice</h2>
        {Array.isArray(picks) && picks.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            draggable={true}
            swipeable={true}
            className="movie-slide"
          >
            {picks.map((pick) => (
              <MovieCard key={pick.id} movie={pick} />
            ))}
          </Carousel>
        ) : (
        <p style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
          추천 영화가 없습니다.
        </p>
        )}
  </Container>

      {/* 리뷰 */}
      {reviewsData?.data?.results?.length > 0 && (
        <Container className="review">
        <h2 className="content-title">Review</h2>
        {reviewsData?.data?.results.map((review)=>(
          <div key={review.id}>
            <Row className='review-item'>
              <Col md={1} className='review-img-wrap'>
              <div className='review-img'>
                {review.author_details.avatar_path? (<img src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${review.author_details.avatar_path}`} alt={review.author} />):(<div className='img-none'>{review.author.slice(0,1)}</div>)}
              </div>
              
              </Col>
              <Col  md={10} className='review-info'>
              <h5 className='author'>{review.author}</h5>
              <h6 className='content'>{review.content}</h6>
              <p className='content'>{review.created_at.slice(0,10)}</p>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
      )}
    </div>
  )
}

export default MovieDetailPage