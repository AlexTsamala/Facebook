import {
  Settings,
  HelpCircle,
  Moon,
  Mail,
  LogOut,
  ArrowRight,
} from "react-feather";
import profileImg from "../../../../assets/სანდროწამალაშვილი.jpg";
import Cookies from "js-cookie";
import "./account.css";
import { signOutUser } from "../../../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const userData = JSON.parse(Cookies.get("userData") || "")[0];
  const navigate = useNavigate();
  const signOutHandler = () => {
    navigate("/log-in");
    signOutUser();
    Cookies.remove("userData");
    Cookies.remove("userToken");
  };

  return (
    <div className="account-container p-3 rounded-lg absolute">
      <div className="flex gap-2 cursor-pointer account-user-section">
        <img
          title="Account"
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={userData.profilePhoto}
        />
        <h3>{userData.name + " " + userData.surname}</h3>
      </div>
      <div className="flex justify-center w-full mt-3 flex-col gap-2">
        <div className="flex justify-between gap-2 cursor-pointer post-buttons-style">
          <div className="flex gap-2">
            <Settings color="#ffffff" />
            <span className="font-semibold post-button-text-style">
              Settings & privacy
            </span>
          </div>
          <ArrowRight color="#ffffff" />
        </div>
        <div className="flex justify-between gap-2 cursor-pointer post-buttons-style">
          <div className="flex gap-2">
            <HelpCircle color="#ffffff" />
            <span className="font-semibold post-button-text-style">
              Help & support
            </span>
          </div>
          <ArrowRight color="#ffffff" />
        </div>
        <div className="flex justify-between gap-2 cursor-pointer post-buttons-style">
          <div className="flex gap-2">
            <Moon color="#ffffff" />
            <span className="font-semibold post-button-text-style">
              Display & accessibility
            </span>
          </div>
          <ArrowRight color="#ffffff" />
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Mail color="#ffffff" />
          <span className="font-semibold post-button-text-style">
            Give feedback
          </span>
        </div>
        <div
          onClick={signOutHandler}
          className="flex gap-2 cursor-pointer post-buttons-style"
        >
          <LogOut color="#ffffff" />
          <span className="font-semibold post-button-text-style">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Account;
