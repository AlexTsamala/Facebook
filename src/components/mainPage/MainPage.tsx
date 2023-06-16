import { useState } from "react";
import Header from "./homePage/Header";
import Homepage from "./homePage/HomePage";
import "./homePage/homePage.css";
import VideoPage from "./videoPage/VideoPage";
import GroupPage from "./groupsPage/GroupsPage";

const MainPage = () => {
  const [topBar, setTopBar] = useState("home");
  return (
    <div className="min-h-screen home-page-container-styles">
      <Header setTopBar={setTopBar} topBar={topBar} />
      {topBar === "home" ? (
        <Homepage />
      ) : topBar === "video" ? (
        <VideoPage />
      ) : (
        <GroupPage />
      )}
    </div>
  );
};

export default MainPage;
