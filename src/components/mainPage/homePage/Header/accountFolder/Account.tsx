import {
  Settings,
  HelpCircle,
  Moon,
  Mail,
  LogOut,
  ArrowRight,
} from "react-feather";
import Cookies from "js-cookie";
import "./account.css";
import { signOutUser } from "../../../../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface props {
  onNavigateToProfile: () => void;
  closeAccount: () => void;
}

const Account: FC<props> = ({ onNavigateToProfile, closeAccount }) => {
  const userDataCookie = Cookies.get("userData");
  const userData = userDataCookie ? JSON.parse(userDataCookie)[0] : null;
  const navigate = useNavigate();

  const signOutHandler = () => {
    navigate("/log-in");
    signOutUser();
    Cookies.remove("userData");
    Cookies.remove("userToken");
  };

  return (
    <div className="account-container p-3 rounded-lg absolute">
      {userData && (
        <div
          onClick={() => {
            navigate("/profilePage/" + userData.name + userData.surname);
            onNavigateToProfile();
            closeAccount();
          }}
          className="flex gap-2 cursor-pointer account-user-section"
        >
          <img
            title="Account"
            className="circle-styles cursor-pointer"
            alt="current-user-img"
            src={userData.profilePhoto}
          />
          <h3>{userData.name + " " + userData.surname}</h3>
        </div>
      )}
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
