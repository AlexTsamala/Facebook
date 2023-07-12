import { FC, useState, RefObject } from "react";
import { Home, Tv, Users, Bell, ArrowLeft } from "react-feather";
import Cookies from "js-cookie";
import Account from "./accountFolder/Account";
import { FaFacebookMessenger, FaFacebook } from "react-icons/fa";
import SearchInputResult from "./searchInputFolder/SearchInputResult";
import { PersonDto } from "../../../../dto/PersonDto";
import { getAllUsers } from "../../../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import blankPhoto from "../../../../assets/avatar-blank.png";
import NotificationModal from "./notificationFolder/NotificationModal";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import "./header.css";
import { NotificationDto } from "../../../../dto/NotificationDto";

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
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  const [usersData, setUsersData] = useState<PersonDto[]>([]);
  const [countNotifications, setCountNotifications] = useState<
    NotificationDto[]
  >([]);
  const navigate = useNavigate();
  const userDataCookie = Cookies.get("userData");
  const currentUserInfo = userDataCookie
    ? JSON.parse(userDataCookie || "")[0]
    : "";

  const db = getFirestore();
  const colRefPosts = collection(db, "Notifications");
  const q = query(colRefPosts, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapShot) => {
    const postsArr: NotificationDto[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postsData = doc.data() as any;
      const posts = { id: doc.id, ...postsData };
      postsArr.push(posts);
    });
    setCountNotifications(
      postsArr.filter((item) => item.ownerId === currentUserInfo.userId)
    );
  });

  const InputValueHandler = (value: string) => {
    setSearchInputValue(value);
    const data = getAllUsers.filter(
      (user: PersonDto) => user.userId !== currentUserInfo.userId
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
              onClick={() => {
                navigate(
                  "/home/" + currentUserInfo.name + currentUserInfo.surname
                );
                barHandler("home");
                Cookies.set("chosenUserId", "");
              }}
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
          value={searchInputValue}
          onChange={(event) => InputValueHandler(event?.target.value)}
          className="rounded-3xl facebook-search-styles"
          type="text"
          placeholder="Search Facebook"
        />
        {searchInputOpen ? (
          <SearchInputResult
            usersData={usersData}
            setSearchInputOpen={setSearchInputOpen}
            setSearchInputValue={setSearchInputValue}
          />
        ) : null}
      </div>
      <div className="flex gap-20 justify-center items-center">
        <div
          onClick={() => {
            barHandler("home");
            navigate(`/home/${currentUserInfo.name}` + currentUserInfo.surname);
            Cookies.set("chosenUserId", "");
          }}
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
          onClick={() => {
            navigate("/watch");
            barHandler("video");
            Cookies.set("chosenUserId", "");
          }}
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
          onClick={() => {
            navigate("/groups");
            barHandler("users");
            Cookies.set("chosenUserId", "");
          }}
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
            setMessNotButtons(
              messNotButtons === "messageBar" ? "" : "messageBar"
            );
            setAccountOpen(false);
            setNotificationModalIsOpen(false);
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
            setMessNotButtons(
              messNotButtons === "notificationBar" ? "" : "notificationBar"
            );
            setAccountOpen(false);
            setNotificationModalIsOpen(!notificationModalIsOpen);
          }}
        >
          {countNotifications.length > 0 ? (
            <div className="flex justify-center items-center bg-red-700 text-white text-xs rounded-full w-5 h-5 absolute red-notification-circle">
              {countNotifications.length}
            </div>
          ) : null}

          <Bell color={"#ffffff"} />
          {notificationModalIsOpen ? <NotificationModal /> : null}
        </div>
        <img
          onClick={() => {
            setAccountOpen(!accountOpen);
            setMessNotButtons("");
            setNotificationModalIsOpen(false);
          }}
          title="Account"
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={
            currentUserInfo.profilePhoto
              ? currentUserInfo.profilePhoto
              : blankPhoto
          }
        />
        {accountOpen ? (
          <Account
            closeAccount={() => setAccountOpen(false)}
            onNavigateToProfile={() => barHandler("")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
