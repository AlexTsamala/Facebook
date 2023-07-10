import coverPhoto from "../../assets/ukraine-flag.jpg";
import Cookies from "js-cookie";
import {
  Edit2,
  ThumbsUp,
  MessageSquare,
  CornerUpRight,
  MoreHorizontal,
  Home,
  MapPin,
  Briefcase,
  Clock,
} from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUserPlus,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FaFacebookMessenger } from "react-icons/fa";
import "./profilePage.css";
import CoverPhotoDropDown from "./EditCoverPhotoDropDown";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  storage,
  oneUser,
  updatePost,
  addNotification,
  oneNotification,
  deleteNotification,
} from "../../../fireBaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
  StorageReference,
} from "firebase/storage";
import { toast } from "react-toastify";
import {
  doc,
  onSnapshot,
  updateDoc,
  collection,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import blankPhoto from "../../assets/avatar-blank.png";
import { PostDto } from "../../dto/PostsDto";
import getTimeAgo from "../../helper/timeConverter";
import earthImg from "../../assets/worldwide.png";
import MoreButtonFunctional from "../mainPage/homePage/MoreButtonSection";
import LikeImg from "../../assets/like.png";
import { PersonDto } from "../../dto/PersonDto";
import { NotificationDto } from "../../dto/NotificationDto";

const ProfilePage = () => {
  const [clickOnLike, setClickOnLike] = useState<string>("#B0B3B8");
  const [coverDropDownIsOpen, setCoverDropDownIsOpen] =
    useState<boolean>(false);
  const [keepCoverIsOpen, setKeepCoverIsOpen] = useState<boolean>(false);
  const [friendStatus, setFriendStatus] = useState<string>("Add friend");
  const [posts, setPosts] = useState<PostDto[]>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [file, setFile] = useState<any>();
  const [friendsList, setFriendsList] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [searchedUserData, setSearchedUserData] = useState<PersonDto>();
  const userData = JSON.parse(Cookies.get("userData") || "")[0];
  const userId = JSON.parse(Cookies.get("userData") || "")[0].userId;
  const chosenUserId = Cookies.get("chosenUserId");
  const [clickedPostId, setClickedPostId] = useState<string>("");
  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  let currentCoverPhoto;
  if (chosenUserId) {
    currentCoverPhoto = searchedUserData?.coverPhoto;
  } else {
    currentCoverPhoto = userData.coverPhoto
      ? userData.coverPhoto
      : imageUrl
      ? imageUrl
      : coverPhoto;
  }

  const db = getFirestore();
  const colRefPosts = collection(db, "Posts");
  const q = query(colRefPosts, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapShot) => {
    const postsArr: PostDto[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postsData = doc.data() as any;
      const posts = { id: doc.id, ...postsData };
      postsArr.push(posts);
    });
    let filteredArr: PostDto[];

    if (chosenUserId) {
      filteredArr = postsArr.filter((post) => post.userId === chosenUserId);
    } else {
      filteredArr = postsArr.filter((post) => post.userId === userData.userId);
    }

    setPosts(filteredArr);
  });

  const loadChosenUserData = async () => {
    if (chosenUserId) {
      const response = await oneUser(chosenUserId);
      setSearchedUserData(response[0]);
    }
  };

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

  const moreButtonHandler = (postId: string) => {
    if (postId === clickedPostId) {
      setClickedPostId("");
    } else {
      setClickedPostId(postId);
    }
  };

  const likeClickHandler = (postId: string, numberOfLikes: number) => {
    if (clickOnLike === "#B0B3B8") {
      setClickOnLike("#2078f4");
      updatePost(postId, numberOfLikes + 1);
    } else {
      setClickOnLike("#B0B3B8");
      updatePost(postId, numberOfLikes - 1);
    }
  };
  useEffect(() => {
    loadChosenUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenUserId]);

  const loadOneUser = async (userId: string) => {
    const result = await oneUser(userId);
    return result;
  };

  useEffect(() => {
    const currentProfileOwner: string = chosenUserId ? chosenUserId : "";

    const fetchNotificationData = () => {
      const notification = oneNotification(userId, "senderId");
      return notification;
    };

    fetchNotificationData().then((notification: NotificationDto[]) => {
      const filteredNotification = notification.filter(
        (item: NotificationDto) => item.ownerId === chosenUserId
      )[0];
      if (filteredNotification?.ownerId === chosenUserId) {
        setFriendStatus("Cancel request");
      }
    });

    const fetchUserData = async () => {
      const response = await loadOneUser(currentProfileOwner);
      return response;
    };

    fetchUserData().then((currentProfileOwnerData: PersonDto[]) => {
      if (currentProfileOwnerData[0]?.friendsList?.includes(userId)) {
        setFriendStatus("Friends");
      }
    });
  }, [friendStatus, userId, chosenUserId]);

  useEffect(() => {
    if (chosenUserId) {
      loadOneUser(chosenUserId).then((userData: PersonDto[]) => {
        setFriendsList(userData[0].friendsList);
      });
    } else {
      setFriendsList(userData.friendsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenUserId]);

  const addFriendHandler = async () => {
    const currentProfileOwner: string = chosenUserId ? chosenUserId : "";
    if (friendStatus === "Add friend") {
      addNotification(
        "sent friend request",
        "Friend request",
        chosenUserId,
        userId,
        userData.name + " " + userData.surname,
        userData.profilePhoto
      );
      setFriendStatus("Cancel request");
    } else if (friendStatus === "Cancel request") {
      const notification = await oneNotification(
        currentProfileOwner,
        "ownerId"
      );

      const notificationId = notification.filter(
        (item) => item.senderId === userId
      )[0].id;
      const checkedNotificationId = notificationId ? notificationId : "";
      deleteNotification(checkedNotificationId);
      setFriendStatus("Add friend");
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
        {chosenUserId ? null : (
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
        )}

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
              src={
                searchedUserData?.profilePhoto
                  ? searchedUserData?.profilePhoto
                  : userData.profilePhoto
                  ? userData.profilePhoto
                  : blankPhoto
              }
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
                {searchedUserData
                  ? searchedUserData.name + " " + searchedUserData.surname
                  : userData.name + " " + userData.surname}
              </h1>
              <span className="friends-quantity-style font-medium ">
                {friendsList.length}
                {friendsList.length > 1 ? " friends" : " friend"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chosenUserId ? (
              <>
                <button
                  onClick={addFriendHandler}
                  type="button"
                  className="edit-profile-section edit-profile-section-color gap-1 text-xs"
                >
                  <FontAwesomeIcon
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "white",
                    }}
                    icon={faUserPlus}
                  />
                  {friendStatus}
                </button>
                <button className="edit-profile-section add-friend-section-color gap-1">
                  <FaFacebookMessenger
                    color={"#ffffff"}
                    style={{ width: "18px", height: "18px" }}
                  />
                  Message
                </button>
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
      <div className="w-full flex justify-center gap-5">
        <div className="bg-postContainer w-pagesWidth mt-3 rounded-md p-3 flex flex-col gap-4 h-80">
          <h1 className="text-white font-medium text-base">Intro</h1>
          <div className="flex gap-2 items-center text-white">
            <Briefcase color="#989898" />
            <h2>Works as Full Stack Web Developer at Ecovis Georgia</h2>
          </div>
          <div className="flex gap-2 items-center text-white">
            <FontAwesomeIcon
              style={{
                width: "18px",
                height: "18px",
                color: "#989898",
              }}
              icon={faGraduationCap}
            />
            <h2>
              Studied at საქართველოს უნივერსიტეტი • The University Of Georgia
            </h2>
          </div>
          <div className="flex gap-2 items-center text-white">
            <Home color="#989898" />
            <h2>Lives in Tbilisi, Georgia</h2>
          </div>
          <div className="flex gap-2 items-center text-white">
            <MapPin color="#989898" />
            <h2>From Tbilisi, Georgia</h2>
          </div>
          <div className="flex gap-2 items-center text-white">
            <Clock color="#989898" />
            <h2>Joined on November 2012</h2>
          </div>
        </div>
        <div className="flex flex-col">
          {posts?.map((post: PostDto) => {
            return (
              <div
                key={post.id}
                className=" w-pagesWidth bg-postContainer mt-3 rounded-md relative"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 p-2.5">
                    <img
                      className="circle-styles cursor-pointer"
                      alt="postAuthorPhoto"
                      src={post.url}
                    />
                    <div>
                      <h3 className="post-author-style">{post.name}</h3>
                      <span className="post-time-style">
                        {getTimeAgo(post.createdAt)}
                        <img
                          title="Public"
                          className=" w-3 h-3"
                          alt="earth"
                          src={earthImg}
                        />
                      </span>
                    </div>
                  </div>

                  {userId === post.userId ? (
                    <div
                      onClick={() => moreButtonHandler(post.id)}
                      className="post-more-button mr-3"
                    >
                      <MoreHorizontal
                        className=" cursor-pointer"
                        color="#b0b3b8"
                      />
                    </div>
                  ) : null}

                  {clickedPostId === post.id ? (
                    <MoreButtonFunctional postId={post.id} />
                  ) : null}
                </div>
                <p className="post-description-style p-2.5">{post.title}</p>
                {post.postPhoto.length > 0 ? (
                  <img alt="postPhoto" src={post.postPhoto} />
                ) : null}
                <div className="flex gap-1 p-2.5">
                  <img className="w-5 h-5" alt="like" src={LikeImg} />
                  <span className="post-button-text-style text-sm">
                    {post.reactions}
                  </span>
                </div>
                <div className="flex justify-around w-full mt-1 engagement-section">
                  <div
                    onClick={() => likeClickHandler(post.id, post.reactions)}
                    className="flex gap-2 cursor-pointer post-buttons-style"
                  >
                    <ThumbsUp color={clickOnLike} />
                    <span
                      style={{ color: clickOnLike }}
                      className="font-semibold post-button-text-style"
                    >
                      Like
                    </span>
                  </div>
                  <div className="flex gap-2 cursor-pointer post-buttons-style">
                    <MessageSquare color="#B0B3B8" />
                    <span className="font-semibold post-button-text-style">
                      Comment
                    </span>
                  </div>
                  <div className="flex gap-2 cursor-pointer post-buttons-style">
                    <CornerUpRight color="#B0B3B8" />
                    <span className="font-semibold post-button-text-style">
                      Share
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
