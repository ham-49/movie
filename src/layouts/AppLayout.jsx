import React, { useState } from "react";
/* 부트스트랩 */
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const AppLayout = () => {
  const location = useLocation(); // 현재 경로 감지
  const [keyword, setKeyword] = useState('');
  const [expanded, setExpanded] = useState(false); // 네비 확장 상태
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      navigate(`/movie?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
      setExpanded(false); // 검색 후 네비 닫기
    }
  };

  // 네비 링크 클릭 시 네비 닫기 함수
  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <div>
      {/* 헤더 */}
      <Navbar expand="lg" variant="dark" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">Movie 306</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="navbarScroll" 
            id="navbar-toggler" 
            onClick={() => setExpanded(prev => !prev)} 
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link 
                as={Link} 
                to="/" 
                active={location.pathname === "/"} 
                onClick={handleNavClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/movie"
                active={location.pathname.startsWith("/movie")}
                onClick={handleNavClick}
              >
                Movie
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/mypage"
                active={location.pathname === "/mypage"}
                onClick={handleNavClick}
              >
                My Page
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                active={location.pathname === "/login"}
                onClick={handleNavClick}
              >
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="영화를 검색하세요"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit">
                <FaSearch />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 메인 */}
      <main>
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <p className="top-text">
          "Every story finds its moment in the quiet of the screen.”
        </p>
        <p className="bottom-text">© 2025 YourSiteName. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
