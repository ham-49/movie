import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useUpcomingMoviesQuery } from '../../../hook/useUpcomingMoviesQuery';
import MovieCard from '../MovieCard/MovieCard';

const UpcomingMovieSlide = () => {
  const {data, isLoading, isError, error} = useUpcomingMoviesQuery()
        if (isLoading) {
        return <h1>로딩중</h1>;
      }
      if (isError) {
        return <h1>{error.message}</h1>;
      }
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
    return (
      <Carousel 
      responsive={responsive}
      infinite={true}//무한반복슬라이드
      autoPlay={true}
      autoPlaySpeed={5000}
      /* showDots={true} */ // 페이지네이션
      draggable={true}
      swipeable={true}
      className='movie-slide'
      >
        {data.data.results.map((movie, index)=>
          <MovieCard movie={movie} key={index}></MovieCard>)}
      </Carousel>
    )
}

export default UpcomingMovieSlide
