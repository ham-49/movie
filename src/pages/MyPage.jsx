import React, { useState } from 'react'
/* 부트스트랩 */
import { Container, Row, Col,Modal ,Button,Card } from 'react-bootstrap'
import avatar from './image/avatar.jpg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
/* 훅(데이터 가져오기) */
import { usePopularMoviesQuery } from '../hook/usePopularMovies';

const MyPage = () => {
  const {data, isLoading, isError, error} = usePopularMoviesQuery();
    console.log('카드',data)
    const [showAll, setShowAll] = useState(false);
  if (isLoading) {
    return <h1>로딩중</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const MovieRank = 66;
  const DramaRank = 53;
  return (
    <div className='my-page'>
      {/* 상단 */}
      <Container className='container-top'>
        <Row>
          <Col md={3} className='container-top-left'>
            <div className="img">
              <img src={avatar} alt="avatar" />
            </div>
          </Col>
          <Col md={9} className='container-top-right'>
            <h3 className='user-name'>User. hyun</h3>
              <Col>
                <p className='text'>당신의 영화 감상 순위는 <span>상위 {MovieRank}%</span> 입니다.</p>
                <CircularProgressbar value={MovieRank} text={`${MovieRank}%`} />
              </Col>
          </Col>
        </Row>
      </Container>
      <Container className='container-bottom'>
        <h3 className="bottom-title">통계</h3>
        <Row>
          <Col md={6} className='total-views'>
            <Row className='views-list'>
              <Col md={6}>
                <p className='title'>총 감상 수</p>
                <p className='count'>144</p>
              </Col>
              <Col md={6}>
                <p className='title'>총 평가 수</p>
                <p className='count'>20</p>
              </Col>
            </Row>
          </Col>
          <Col md={6} className='activity'>
            <Row className='activity-list'>
              <Col>
                <p className='title'>최근 활동 / 토론 목록</p>
                <div className="list-active">
                  <p>미녀와 야수</p>
                  <div className="active-wrap">
                    <span className='review'> 
                      <MdOutlineSubdirectoryArrowRight />
                      오랜만에 다시 보니 감회가 새로운 것 같네요.
                    </span>
                    <span>
                      2025.07.12
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <p className="bottom-title">관심목록</p>
        <Row className='favorites'>
          <Col md={6} className='favorites-movie favorites-lists'>
            <h3 className="favorites-title">관심영화</h3>
            <div className="favorites-list">
              {data.data.results.length > 3 && (
                <div className="toggle-btn-wrap">
                  <Button
                    className='toggle-btn'
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? <FaMinus /> : <FaPlus />}
                  </Button>
                </div>
              )}
              {data.data.results
                .slice(0, showAll ? data.data.results.length : 3)
                .map((movie, index) => (
                  <Card key={index} className='favorite-card'>
                    <Card.Img
                      variant="top"
                      src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                    </Card.Body>
                  </Card>
              ))}
            </div>
          </Col>

          <Col md={6} className='favorites-drama favorites-list list-none'>
            <h3 className="favorites-title">소장 내역</h3>
            <p className="favorites-list">소장하신 내역이 없습니다.</p>
          </Col>
        </Row>
      </Container>
      {/* 통계 */}
      {/* 관심목록 */}
    </div>
  )
}

export default MyPage
