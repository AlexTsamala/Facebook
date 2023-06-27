import coverPhoto from "../../assets/ukraine-flag.jpg";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

  return (
    <div className="flex items-center">
      <div className="w-full">
        <img alt="cover" src={coverPhoto} />
        <div>
          <img alt="profile" src={userData.profilePhoto} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
