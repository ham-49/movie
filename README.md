<h1 style="font-size: 36px; font-weight: bold; margin-bottom: 0.8em;"> 🎥영화 사이트 제작 프로젝트</h1>

<br>

## 🎞 프로젝트 개요

본 프로젝트는 **영화 사이트** 를 신규로 제작한 프로젝트로 TMDB에서 제공하는 영화 데이터 정보를 활용하여 작업한 웹 프로젝트 입니다.
hook을 사용하여 다양한 종류의 데이터를 가지고와 정보를 활용하여 배치하였으며, 다양한 Library를 활용하여 제작하였습니다.

<br>

## 💡 프로젝트 소개
#### 소요기간 : 5일

<br>

## 🗂️ 개발환경

- **React**
- **SCSS**
- **API (TMDB)**
- **Library (react-router)**
- **Library (react-query)**
- **Library (bootstrap)**
- **Library (react-icons)**
- **Library (progressbar)**
- **Library (rc-pagination,rc-Select)**
- **Library (carousel)**
- **Design (Figma)**
  <br>
  **[https://www.figma.com/design/9BUnz6DkhRflJLlbSQhCGa/movie?node-id=5-206&m=dev&t=Hvnd1ijXT7beboxC-1]**
  
<br>

## 💡 기획 및 UI/UX 고려 사항

| 항목 | 설명 |
|------|------|
| **영화 탐색 중심** | 메인 페이지에서 쉽게 영화 썸네일을 탐색 가능. 정렬, 장르 필터로 접근성 강화. |
| **검색 기능 강화** | 키워드 검색 지원으로 원하는 콘텐츠 빠르게 찾을 수 있도록 UX 최적화. |
| **카드형 레이아웃** | 영화 정보를 이미지, 제목, 별점 형태로 카드에 배치해 직관적으로 탐색 가능. |
| **반응형 디자인** | 데스크탑, 태블릿, 모바일에서 자연스럽게 레이아웃이 재배치되며 콘텐츠 접근이 쉬움. |

<br>

## 📌 페이지 구성 및 기능

### 🛠페이지 구성
<table>
  <tr>
    <td>home-page</td>
    <td>movie</td>
    <td>detail-page</td>
  </tr>
  <tr>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/369cefb9-997e-4597-8ada-d7f4836d49dc" />
    </td>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/73780ae5-7972-4692-8f6a-d00f66076605" />
    </td>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/0e49e34f-f0e2-4809-a5e6-2fe70090c2c7" />
    </td>
  </tr>
  <tr>
    <td>my-page</td>
    <td>login-page</td>
    <td>404 page</td>
  </tr>
    <tr>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/6e6f9d57-5d05-4600-b505-6384a0487b36" />
    </td>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/92686472-9fa2-42d1-a55a-ddfc8d90a6e1" />
    </td>
    <td valign="top">
      <img width="300" alt="Image" src="https://github.com/user-attachments/assets/f5ee3c25-cec4-403d-a979-ad04d2d201cc" />
    </td>
  </tr>
</table>

### 🛠 1. hook
- **다양한 TMDB 데이터 활용**  
  : React Query 기반의 커스텀 Hook을 사용하여 TMDB API에서 인기 영화, 최신 영화, 영화 상세 정보, 정렬 옵션 등 다양한 데이터를 조건별로 fetch하고, 이를 각 페이지에서 효율적으로 활용할 수 있도록 구성.
  
  | 주요 hook | 설명 |
  |------|------|
  | **useAllMoviesQuery** | 전체 영화 정보를 100개 정도 불러오며, movie 페이지 용으로 전체 영화 목록을 보여줍니다. <br>TMDB에서 제공하는 sort 기능을 활용하여, 클릭된 경우 sort된 데이터를 제공. |
  | **useMovieDetail** | 영화의 세부 정보를 가져옴. |
  | **useMovieReviews** | 영화의 리뷰/토론 내역 가져옴. |
  | **useSearchMovieQuery** | 키워드를 기반으로 영화 검색 API를 호출해 관련 데이터를 가져옴. |


### 🛠 2. Layout
- **페이지 레이아웃 구조 구현**  
  : AppLayout 컴포넌트를 사용해 헤더, 메인, 푸터 영역을 구성했으며, Outlet을 활용해 하위 라우트를 렌더링할 수 있도록 설계했습니다.  <br>
  : App 파일에서 전반적인 라우터를 작성하였고 이 정보를 App 레이아웃에서 Outlet 으로 불러올 수 있도록 설계했습니다.

### 🛠 3. Components
- **Slide**  
  : 개별 슬라이드 컴포넌트를 별도 파일로 작성한 후, Carousel을 활용해 슬라이드를 구성했습니다. <br>
  : 홈페이지에서는 필요한 슬라이드를 import하여 화면에 노출하도록 설계했습니다.
  
- **MovieCard**  
  : MovieCard 컴포넌트를 만들어 기본 레이아웃과 호버 이벤트를 구현했습니다. <br>
  : 각각의 파일에서 불러온 Hook 정보를 반영하여 해당 정보를 Card에 반영하여 보여줄 수 있도록 구현하였습니다.

## 📬 프로젝트 총평

이번 **영화 사이트 프로젝트**는 방대한 API 데이터를 원하는 형태로 불러와 가공하고, 이를 화면에 렌더링하는 데 중점을 두었습니다.
수업을 통해 React Query와 Hook을 활용하여 API에서 데이터를 받아오고, 필요한 정보만 추출해 이미지와 텍스트로 보여주는 방법을 학습했습니다.
공식 문서와 다양한 예제를 참고하며 반복되는 API 주소 패턴을 파악하고, 데이터를 효율적으로 가공하는 방법도 깊이 있게 익힐 수 있었습니다.
특히, 등장인물 정보를 처음에는 일부만 보여주고, 이후 전체 데이터를 불러와 이미지 형태로 추가하는 등 추가 학습을 통해 다양한 정보를 효과적으로 표현하는 방법도 공부했습니다.

또한 여러 라이브러리를 적용하고 CSS를 수정하면서, 사이트에 맞는 커스텀 라이브러리를 찾고 활용하는 방법도 익혔습니다.
아직 React를 완벽히 다루진 못하지만, 전체적인 데이터 흐름과 처리 과정을 이해하며 실무에 적용할 수 있는 기초를 쌓는 좋은 경험이 되었습니다.

이번 프로젝트를 바탕으로 다음에는 더 완성도 높은 프로젝트를 진행할 수 있도록 지속해서 학습해 나가고자 합니다.

<br>

**❗ 본 프로젝트는 비상업적 학습, 포트폴리오 용도로 제작되었습니다.**
