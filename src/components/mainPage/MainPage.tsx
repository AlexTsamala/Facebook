import { useState } from "react";
import Header from "./homePage/Header/Header";
import Homepage from "./homePage/HomePage";
import "./homePage/homePage.css";
import VideoPage from "./videoPage/VideoPage";
import GroupPage from "./groupsPage/GroupsPage";

const MainPage = () => {
  const [topBar, setTopBar] = useState("home");
  return (
    <div className="min-h-screen home-page-container-styles relative">
      <Header setTopBar={setTopBar} topBar={topBar} />
      <div className=" px-2">
        {topBar === "home" ? (
          <Homepage />
        ) : topBar === "video" ? (
          <VideoPage />
        ) : (
          <GroupPage />
        )}
      </div>
    </div>
  );
};

export default MainPage;
