import coverPhoto from "../../assets/ukraine-flag.jpg";
import Cookies from "js-cookie";
import { Edit2 } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookMessenger } from "react-icons/fa";
import "./profilePage.css";
import CoverPhotoDropDown from "./EditCoverPhotoDropDown";
import { ChangeEvent, useRef, useState } from "react";
import { db, storage, oneUser } from "../../../fireBaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
  StorageReference,
} from "firebase/storage";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [coverDropDownIsOpen, setCoverDropDownIsOpen] =
    useState<boolean>(false);
  const [keepCoverIsOpen, setKeepCoverIsOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const userData = JSON.parse(Cookies.get("userData") || "")[0];
  const [profilePhoto, setProfilePhoto] = useState<string>(
    userData.profilePhoto
  );
  const chosenUserId = Cookies.get("chosenUserId");
  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  const currentCoverPhoto = userData.coverPhoto
    ? userData.coverPhoto
    : imageUrl
    ? imageUrl
    : coverPhoto;

  const handleChangeCoverPhoto = () => {
    const storageRef: StorageReference = ref(
      storage,
      `/images/${Date.now()}${file?.name}`
    );

    const uploadImage: UploadTask = uploadBytesResumable(storageRef, file);

    uploadImage.on(
      "state_changed",
      () => {
        // const progressPercent = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgressIndicator(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = doc(db, "Users", userData.id);
          const newArticle = {
            coverPhoto: url,
          };
          updateDoc(articleRef, newArticle)
            .then(async () => {
              setImageUrl(newArticle.coverPhoto);
              setFile("");
              setCoverDropDownIsOpen(false);
              setKeepCoverIsOpen(false);
              const response = await oneUser(userData.userId);
              Cookies.set("userData", JSON.stringify(response));
              toast("Cover photo successfully added", { type: "success" });
            })
            .catch(() => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  const handlePhotoVideoClick = () => {
    if (fileInputRefProfile.current) {
      fileInputRefProfile.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef: StorageReference = ref(
        storage,
        `/images/${Date.now()}${file?.name}`
      );

      const uploadImage: UploadTask = uploadBytesResumable(storageRef, file);

      uploadImage.on(
        "state_changed",
        () => {
          // const progressPercent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgressIndicator(progressPercent);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const articleRef = doc(db, "Users", userData.id);
            const newArticle = {
              profilePhoto: url,
            };
            updateDoc(articleRef, newArticle)
              .then(async () => {
                const response = await oneUser(userData.userId);
                Cookies.set("userData", JSON.stringify(response));
                setProfilePhoto(response[0].profilePhoto);
                window.location.reload();
                toast("Profile picture successfully added", {
                  type: "success",
                });
              })
              .catch(() => {
                toast("Error adding article", { type: "error" });
              });
          });
        }
      );
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-full flex items-center justify-center flex-col bg-postContainer relative">
        <img
          className=" w-3/4 h-backgroundPhotoHeight rounded"
          alt="cover"
          src={currentCoverPhoto}
        />
        {keepCoverIsOpen ? (
          <div className="confirm-photo-change bg-white  gap-1 absolute">
            <button
              onClick={() => setKeepCoverIsOpen(false)}
              className="bg-red-800 p-1 rounded"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleChangeCoverPhoto}
              className=" bg-green-700 p-1 rounded"
              type="button"
            >
              Keep this cover photo
            </button>
          </div>
        ) : null}
        <div
          onClick={() => setCoverDropDownIsOpen(!coverDropDownIsOpen)}
          className="font-medium bg-white absolute rounded-md p-2 flex items-center gap-2 cursor-pointer edit-cover-class"
        >
          <FontAwesomeIcon
            style={{ width: "18px", height: "18px" }}
            icon={faCamera}
          />
          Edit cover photo
        </div>
        {coverDropDownIsOpen ? (
          <CoverPhotoDropDown
            setKeepCoverIsOpen={setKeepCoverIsOpen}
            setFile={setFile}
            setImageUrl={setImageUrl}
          />
        ) : null}
        <div className="main-profile-container px-4">
          <div className="flex items-center gap-4 -mt-8 relative">
            <img
              className="rounded-full w-44 h-44"
              alt="profile"
              src={profilePhoto}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefProfile}
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="edit-profile-photo rounded-full w-9 h-9 flex items-center justify-center add-friend-section-color p-2 absolute edit-profile-class">
              <FontAwesomeIcon
                onClick={handlePhotoVideoClick}
                style={{
                  width: "18px",
                  height: "18px",
                  color: "white",
                }}
                icon={faCamera}
              />
            </div>
            <div>
              <h1 className="text-white font-medium text-xl">
                {userData.name + " " + userData.surname}
              </h1>
              <span className="friends-quantity-style font-medium ">
                200 friends
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chosenUserId ? (
              <>
                <div className="edit-profile-section edit-profile-section-color gap-1">
                  <FontAwesomeIcon
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "white",
                    }}
                    icon={faUserPlus}
                  />
                  Add friend
                </div>
                <div className="edit-profile-section add-friend-section-color gap-1">
                  <FaFacebookMessenger
                    color={"#ffffff"}
                    style={{ width: "18px", height: "18px" }}
                  />
                  Message
                </div>
              </>
            ) : (
              <>
                <div className="edit-profile-section edit-profile-section-color gap-1">
                  + Add to story
                </div>
                <div className="edit-profile-section add-friend-section-color gap-1">
                  {<Edit2 width={16} height={16} />} Edit profile
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <h1 className=" text-gray-300">line</h1>
    </div>
  );
};

export default ProfilePage;
