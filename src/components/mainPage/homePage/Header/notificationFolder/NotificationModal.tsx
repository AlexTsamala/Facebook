import {} from "react-feather";
import "../accountFolder/account.css";
import "./notification.css";
import { FC, useState } from "react";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import { NotificationDto } from "../../../../../dto/NotificationDto";
import getTimeAgo from "../../../../../helper/timeConverter";
import {
  deleteNotification,
  updateNotification,
} from "../../../../../../fireBaseConfig";
import Cookies from "js-cookie";

const NotificationModal: FC = () => {
  const [data, setData] = useState<NotificationDto[]>([]);
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

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
    setData(postsArr.filter((item) => item.ownerId === userData.userId));
  });

  const addFriendHandler = (clickedNotification: NotificationDto) => {
    updateNotification(
      clickedNotification.ownerId,
      clickedNotification.senderId
    );
    updateNotification(
      clickedNotification.senderId,
      clickedNotification.ownerId
    );
    const currentNotificationId = clickedNotification.id
      ? clickedNotification.id
      : "";
    deleteNotification(currentNotificationId);
  };

  const cancelRequestHandler = (id: string) => {
    deleteNotification(id);
  };

  return (
    <>
      <div className="account-container p-3 rounded-lg absolute">
        {data.map((item: NotificationDto) => {
          return (
            <div
              key={item.id}
              className="flex justify-center w-full mt-3 gap-2"
            >
              <img
                className="w-14 h-14 rounded-full"
                alt="notifier"
                src={item.profilePhoto}
              />
              <div className="text-white flex flex-col">
                <p className="text-base">
                  <span className="font-bold"> {item.senderName} </span>
                  {item.description}
                </p>
                <div className="flex gap-4 mt-2 mb-2">
                  <button
                    onClick={() => addFriendHandler(item)}
                    className="bg-lime-900 p-1 rounded-lg"
                    type="button"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => cancelRequestHandler(item.id || "")}
                    className=" bg-red-800 p-1 rounded-lg"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
                <span className="time-ago-class text-xs">
                  {getTimeAgo(item.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {data.length === 0 ? (
          <h1 className="text-base text-white">
            You don't have any notification
          </h1>
        ) : null}
      </div>
    </>
  );
};

export default NotificationModal;
