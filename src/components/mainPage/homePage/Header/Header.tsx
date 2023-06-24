import { FC, useState, RefObject, useEffect } from "react";
import { Home, Tv, Users, Bell, ArrowLeft } from "react-feather";
import Cookies from "js-cookie";
import Account from "./Account";
import { FaFacebookMessenger, FaFacebook } from "react-icons/fa";
import SearchInputResult from "./searchInputFolder/SearchInputResult";
import { PersonDto } from "../../../../dto/PersonDto";
import { getAllUsers } from "../../../../../fireBaseConfig";

interface props {
  setTopBar: (name: string) => void;
  topBar: string;
  searchInputOpen: boolean;
  setSearchInputOpen: (status: boolean) => void;
  clickedPlace: RefObject<HTMLInputElement>;
}

const Header: FC<props> = ({
  setTopBar,
  topBar,
  searchInputOpen,
  setSearchInputOpen,
  clickedPlace,
}) => {
  const [messNotButtons, setMessNotButtons] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [usersData, setUsersData] = useState<PersonDto[]>([]);
  // const [searchInputValue, setSearchInputValue] = useState<string>("");

  const profilePhoto = JSON.parse(Cookies.get("userData") || "")[0]
    .profilePhoto;
  const currentUserId = JSON.parse(Cookies.get("userData") || "")[0].userId;

  const InputValueHandler = (value: string) => {
    // setSearchInputValue(value);
    const data = getAllUsers.filter(
      (user: PersonDto) => user.userId !== currentUserId
    );
    const filteredData = data.filter((user: PersonDto) =>
      (user.name + " " + user.surname).includes(value)
    );
    if (value.length === 0) {
      setUsersData([]);
    } else {
      setUsersData(filteredData);
    }
  };

  const barHandler = (name: string) => {
    setTopBar(name);
  };

  return (
    <div className="header-container">
      <div className="flex items-center gap-3 margin-style-for-header-elements">
        {!searchInputOpen ? (
          <>
            <div className="bg-white w-8 h-9 facebook-background-styles"></div>
            <FaFacebook
              className="w-10 cursor-pointer h-10 z-10"
              color={"#1E90FF"}
            />
          </>
        ) : (
          <div className="mr-4">
            <ArrowLeft
              onClick={() => setSearchInputOpen(false)}
              color="#ffffff"
              className="cursor-pointer "
            />
          </div>
        )}
        <input
          ref={clickedPlace}
          onClick={() => {
            setSearchInputOpen(true);
          }}
          onChange={(event) => InputValueHandler(event?.target.value)}
          // value={searchInputValue}
          className="rounded-3xl facebook-search-styles"
          type="text"
          placeholder="Search Facebook"
        />
        {searchInputOpen ? <SearchInputResult usersData={usersData} /> : null}
      </div>
      <div className="flex gap-20 justify-center items-center">
        <div
          onClick={() => barHandler("home")}
          className={`bar-pictures-container ${
            topBar === "home" ? "active-bar-color" : "inActive-bar-color"
          }`}
        >
          <Home
            className="cursor-pointer"
            color={topBar === "home" ? "#385898" : "#b0b3b8"}
          />
        </div>
        <div
          onClick={() => barHandler("video")}
          className={`bar-pictures-container ${
            topBar === "video" ? "active-bar-color" : "inActive-bar-color"
          }`}
        >
          <Tv
            className="cursor-pointer"
            color={topBar === "video" ? "#385898" : "#b0b3b8"}
          />
        </div>
        <div
          onClick={() => barHandler("users")}
          className={`bar-pictures-container ${
            topBar === "users" ? "active-bar-color" : "inActive-bar-color"
          }`}
        >
          <Users
            className="cursor-pointer"
            color={topBar === "users" ? "#385898" : "#b0b3b8"}
          />
        </div>
      </div>
      <div className="flex gap-3 margin-style-for-header-elements">
        <div
          className={`circle-styles cursor-pointer ${
            messNotButtons === "messageBar" ? "circle-styles-active" : ""
          } `}
          onClick={() => {
            setMessNotButtons("messageBar");
            setAccountOpen(false);
          }}
        >
          <FaFacebookMessenger
            color={"#ffffff"}
            style={{ width: "22px", height: "22px" }}
          />
        </div>
        <div
          className={`circle-styles cursor-pointer ${
            messNotButtons === "notificationBar" ? "circle-styles-active" : ""
          } `}
          onClick={() => {
            setMessNotButtons("notificationBar");
            setAccountOpen(false);
          }}
        >
          <Bell color={"#ffffff"} />
        </div>
        <img
          onClick={() => {
            setAccountOpen(!accountOpen);
            setMessNotButtons("");
          }}
          title="Account"
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={profilePhoto}
        />
        {accountOpen ? <Account /> : null}
      </div>
    </div>
  );
};

export default Header;
