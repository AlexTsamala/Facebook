import { Users } from "react-feather";
import Cookies from "js-cookie";
import "./leftSideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faUsersRectangle,
  faStore,
  faCalendarCheck,
  faSeedling,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { FaFacebookMessenger } from "react-icons/fa";

const LeftSideBar = () => {
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

  return (
    <div className="pages-margin flex flex-col gap-2">
      <div className="flex gap-2 cursor-pointer sidebar-user-section">
        <img
          title="Account"
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={userData.profilePhoto}
        />
        <h3>{userData.name + " " + userData.surname}</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <Users color="#1E90FF" width={36} height={36} />
        <h3 className="font-semibold text-white">Friends</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faCalendarCheck}
          style={{ color: "#FF4500", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">Events</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faBullhorn}
          style={{ color: "	#1E90FF", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">AD Center</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faSeedling}
          style={{ color: "#32CD32", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">Climate Science Center</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faUsersRectangle}
          style={{ color: "	#1E90FF", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">Groups</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faStore}
          style={{ color: "	#1E90FF", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">MarketPlace</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FontAwesomeIcon
          icon={faFlag}
          style={{ color: "#FFD700", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">Pages</h3>
      </div>
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <FaFacebookMessenger
          style={{ color: "#EE82EE", width: "36px", height: "36px" }}
        />
        <h3 className="font-semibold text-white">Messenger</h3>
      </div>
    </div>
  );
};

export default LeftSideBar;
