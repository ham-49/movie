import "./App.css";
import {Routes, Route} from "react-router-dom";
/* layouts */
import AppLayout from "./layouts/AppLayout";
/* pages */
import HomePage from "./pages/homepage/HomePage";
import MoviePage from "./pages/moviepage/MoviePage";
import MovieDetailPage from "./pages/moviedetailpage/MovieDetailPage";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
/* css */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.scss"

function App() {
  return (
    <Routes>
      {/* 관계되는 모든 Route를 AppLayout 안에 묶어서 관리한다. AppLayout 안에서 Outlet을 이용하여 해당되는 컴포넌트를 화면에 출력한다. */}
      {/* AppLayout과 같은 수준에 유저용 레이아웃, 관리자용 레이아웃 등을 따로 둘 수 있다. */}
      <Route path="/" element={<AppLayout></AppLayout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        {/* 반복되는 구간도 한 Route 안에 묶을 수 있다. */}
        <Route path="/movie">
          <Route index element={<MoviePage></MoviePage>}></Route>
          <Route path=":id" element={<MovieDetailPage></MovieDetailPage>}></Route>
        </Route>
        {/* 로그인, 마이, 404 */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
