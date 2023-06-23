import { useRef, useState } from "react";
import Header from "./homePage/Header/Header";
import Homepage from "./homePage/HomePage";
import "./homePage/homePage.css";
import VideoPage from "./videoPage/VideoPage";
import GroupPage from "./groupsPage/GroupsPage";

const MainPage = () => {
  const [topBar, setTopBar] = useState("home");
  const [searchInputOpen, setSearchInputOpen] = useState(false);

  const clickedPlace = useRef<HTMLInputElement>(null);

  const clickedPlaceHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== clickedPlace.current) {
      setSearchInputOpen(false);
    }
  };

  return (
    <div
      onClick={clickedPlaceHandler}
      className="min-h-screen home-page-container-styles relative"
    >
      <Header
        setSearchInputOpen={setSearchInputOpen}
        searchInputOpen={searchInputOpen}
        setTopBar={setTopBar}
        topBar={topBar}
        clickedPlace={clickedPlace}
      />
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
