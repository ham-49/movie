import React from 'react'
import { Link } from 'react-router-dom';
import img01 from './image/404page.png'

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <div className="page-content">
        <img src={img01} alt="404이미지" />
        <div className="text-wrap">
          <h2>
            찾는 페이지가 없습니다. 
            <br /> 
            홈으로 돌아가거나 다른 주소를 찾아보세요.
          </h2>
          <Link to="/" className='home-btn'>
            <button>Go To Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage