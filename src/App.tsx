import LoginPage from "./components/LogIn/LoginPage";
import { Navigate, Route, Routes } from "react-router";
import MainPage from "./components/mainPage/MainPage";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/mainPage/homePage/Header/Header";
import { useState, useRef } from "react";
import Cookies from "js-cookie";
import GroupPage from "./components/mainPage/groupsPage/GroupsPage";
import VideoPage from "./components/mainPage/videoPage/VideoPage";
import ProfilePage from "./components/profilePage/ProfilePage";

function App() {
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const userDataCookie = Cookies.get("userData");
  const userData = userDataCookie ? true : false;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(userData);
  const [topBar, setTopBar] = useState("home");
  const clickedPlace = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen home-page-container-styles relative">
      {isUserLoggedIn ? (
        <Header
          setIsUserLoggedIn={setIsUserLoggedIn}
          setSearchInputOpen={setSearchInputOpen}
          searchInputOpen={searchInputOpen}
          setTopBar={setTopBar}
          topBar={topBar}
          clickedPlace={clickedPlace}
        />
      ) : null}

      <Routes>
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route
          path="/log-in"
          element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
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
