import React from 'react'
/* 베너 */
import Banner from './banners/Banner'
/* 슬라이드 */
import PopularMovieSlide from './PopularMovieSlide/PopularMovieSlide'
import NowPlayingMovieSlide from './NowPlayingMovieSlide/NowPlayingMovieSlide'
import TopRatedMovieSlide from './TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './UpcomingMovieSlide/UpcomingMovieSlide'

const HomePage = () => {
  //배너(인기영화중에 0번째 배경이미지), 인기영화, 평점높은, 상영예정
  return (
    <div className='home-page'>
      <Banner></Banner>
      <div className="homepage-content">
        {/* 현재 상영작 */}
        <h2 className='homepage-title'>현재 상영작</h2>
        <p className='homepage-sub-title'>극장에서 상영 중인  최신 영화를 확인해보세요.</p>
        <NowPlayingMovieSlide></NowPlayingMovieSlide>
        {/* 인기 영화 */}
        <h2 className='homepage-title'>인기 영화</h2>
        <p className='homepage-sub-title'>지금 가장 화제를  모으고 있는 인기 영화를 만나보세요.</p>
        <PopularMovieSlide></PopularMovieSlide>
        {/* 상영 예정작 */}
        <h2 className='homepage-title'>상영 예정작</h2>
        <p className='homepage-sub-title'>곧 개봉할 기대작들을  미리 만나보세요.</p>
        <UpcomingMovieSlide></UpcomingMovieSlide>
        {/* 평점 높은 영화 */}
        <h2 className='homepage-title'>평점 높은 영화</h2>
        <p className='homepage-sub-title'>관객과 평단 모두가  인정한 명작들을 소개합니다.</p>
        <TopRatedMovieSlide></TopRatedMovieSlide>
      </div>
    </div>
  )
}

export default HomePage