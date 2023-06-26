import { FC, RefObject } from "react";
import Homepage from "./homePage/HomePage";
import "./homePage/homePage.css";

interface props {
  setSearchInputOpen: (status: boolean) => void;
  clickedPlace: RefObject<HTMLInputElement>;
  setTopBar: (barName: string) => void;
}

const MainPage: FC<props> = ({
  setSearchInputOpen,
  clickedPlace,
  setTopBar,
}) => {
  const clickedPlaceHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== clickedPlace.current) {
      setSearchInputOpen(false);
    }
  };

  return (
    <div onClick={clickedPlaceHandler} className="px-2">
      <Homepage setTopBar={setTopBar} />
    </div>
  );
};

export default MainPage;
