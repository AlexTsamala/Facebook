import LoginPage from "./components/LogIn/LoginPage";
import { Navigate, Route, Routes } from "react-router";
import MainPage from "./components/mainPage/MainPage";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/mainPage/homePage/Header/Header";
import { useState, useRef } from "react";
import GroupPage from "./components/mainPage/groupsPage/GroupsPage";
import VideoPage from "./components/mainPage/videoPage/VideoPage";
import ProfilePage from "./components/profilePage/ProfilePage";
import { useLocation } from "react-router-dom";

function App() {
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const [topBar, setTopBar] = useState("home");
  const clickedPlace = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="min-h-screen home-page-container-styles relative">
      {pathname !== "/log-in" ? (
        <Header
          setSearchInputOpen={setSearchInputOpen}
          searchInputOpen={searchInputOpen}
          setTopBar={setTopBar}
          topBar={topBar}
          clickedPlace={clickedPlace}
        />
      ) : null}

      <Routes>
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route
          path="/home/:name"
          element={
            <MainPage
              setSearchInputOpen={setSearchInputOpen}
              setTopBar={setTopBar}
              clickedPlace={clickedPlace}
            />
          }
        />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/profilePage/:name" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
