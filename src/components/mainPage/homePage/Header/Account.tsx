import { Settings, HelpCircle, Moon, Mail, LogOut } from "react-feather";
import profileImg from "../../../../assets/სანდროწამალაშვილი.jpg";
import Cookies from "js-cookie";
import "./account.css";

const Account = () => {
  const userData = JSON.parse(Cookies.get("userData") || "")[0];
  return (
    <div className="account-container p-3 rounded-lg absolute">
      <div className="flex gap-2 cursor-pointer account-user-section">
        <img
          title="Account"
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={profileImg}
        />
        <h3>{userData.name + " " + userData.surname}</h3>
      </div>
      <div className="flex justify-center w-full mt-3 flex-col gap-2">
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Settings color="#ffffff" />
          <span className="font-semibold post-button-text-style">
            Settings & privacy
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <HelpCircle color="#ffffff" />
          <span className="font-semibold post-button-text-style">
            Help & support
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Moon color="#ffffff" />
          <span className="font-semibold post-button-text-style">
            Display & accessibility
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Mail color="#ffffff" />
          <span className="font-semibold post-button-text-style">
            Give feedback
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <LogOut color="#ffffff" />
          <span className="font-semibold post-button-text-style">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Account;
