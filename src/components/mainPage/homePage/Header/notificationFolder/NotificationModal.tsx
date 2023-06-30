import {} from "react-feather";
import "../accountFolder/account.css";
import "./notification.css";
import senderImg from "../../../../../assets/სანდროწამალაშვილი.jpg";

const NotificationModal = () => {
  return (
    <>
      <div className="account-container p-3 rounded-lg absolute">
        <div className="flex justify-center w-full mt-3 gap-2">
          <img
            className="w-14 h-14 rounded-full"
            alt="notifier"
            src={senderImg}
          />
          <div className="text-white flex flex-col">
            <p className="text-base">
              <span className="font-bold">Sandro Tsamalashvili</span> sent
              friend request
            </p>
            <div>
              <button type="button">Confirm</button>
              <button type="button">Cancel</button>
            </div>
            <span className="time-ago-class text-xs">57 minutes ago</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
