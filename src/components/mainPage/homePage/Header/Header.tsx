import { FC, useState } from "react";
import { Home, Tv, Users, Bell, MessageCircle } from "react-feather";
import facebookImg from "../../../../assets/facebook.png";
import Cookies from "js-cookie";
import Account from "./Account";

interface props {
  setTopBar: (name: string) => void;
  topBar: string;
}

const Header: FC<props> = ({ setTopBar, topBar }) => {
  const [messNotButtons, setMessNotButtons] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const profilePhoto = JSON.parse(Cookies.get("userData") || "")[0]
    .profilePhoto;

  const barHandler = (name: string) => {
    setTopBar(name);
  };

  return (
    <div className="header-container">
      <div className="flex gap-3 margin-style-for-header-elements">
        <img
          className="w-10 cursor-pointer"
          alt="facebook-logo"
          src={facebookImg}
        />
        <input
          className="rounded-3xl facebook-search-styles"
          type="text"
          placeholder="Search Facebook"
        />
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
          onClick={() => setMessNotButtons("messageBar")}
        >
          <MessageCircle color={"#ffffff"} />
        </div>
        <div
          className={`circle-styles cursor-pointer ${
            messNotButtons === "notificationBar" ? "circle-styles-active" : ""
          } `}
          onClick={() => setMessNotButtons("notificationBar")}
        >
          <Bell color={"#ffffff"} />
        </div>
        <img
          onClick={() => {
            setAccountOpen(!accountOpen);
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
