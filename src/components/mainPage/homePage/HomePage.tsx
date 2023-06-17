import "./homePage.css";
import { Video, Image, Smile } from "react-feather";
import profileImg from "../../../assets/სანდროწამალაშვილი.jpg";
import Cookies from "js-cookie";

const Homepage = () => {
  const userName = JSON.parse(Cookies.get("userData") || "")[0].name;

  return (
    <div className="flex justify-center items-start rounded-md bg-postContainer p-3 flex-col">
      <div className="flex gap-2">
        <img
          className="circle-styles cursor-pointer"
          alt="current-user-img"
          src={profileImg}
        />
        <input
          className="rounded-3xl facebook-search-styles w-postInputWidth p-2.5"
          type="text"
          placeholder={`What's on your mind ${userName} ?`}
        />
      </div>
      <hr className="border text-white w-full mt-3" />
      <div className="flex justify-center w-full mt-3">
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Video color="red" />
          <span className="font-semibold post-button-text-style">
            Live video
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Image color="green" />
          <span className="font-semibold post-button-text-style">
            Photo/video
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer post-buttons-style">
          <Smile color="yellow" />
          <span className="font-semibold post-button-text-style">
            Feeling/activity
          </span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
