import testImg from "../../../../../assets/სანდროწამალაშვილი.jpg";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { MessengerDto } from "../../../../../dto/MessengerDto";
import { PersonDto } from "../../../../../dto/PersonDto";
import "./messengerModal.css";
import { oneUser } from "../../../../../../fireBaseConfig";
import { Fragment, useState } from "react";

const MessengerModal = () => {
  const [data, setData] = useState<PersonDto[]>([]);
  const userData: PersonDto = JSON.parse(Cookies.get("userData") || "")[0];
  const db = getFirestore();
  const colRefPosts = collection(db, "Messages");
  const q = query(colRefPosts, orderBy("createdAt", "asc"));

  onSnapshot(q, async (snapShot) => {
    const messengerArr: MessengerDto[] = [];
    const friendsIdArr: string[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messengerData = doc.data() as any;
      const messenger = { id: doc.id, ...messengerData };
      messengerArr.push(messenger);
    });
    const currentUsersAllMessage = messengerArr.filter(
      (item) =>
        item.receiverId === userData.userId || item.senderId === userData.userId
    );

    currentUsersAllMessage.map((item) => {
      friendsIdArr.push(
        item.receiverId !== userData.userId ? item.receiverId : ""
      );
      friendsIdArr.push(
        item.senderId !== userData.userId ? item.receiverId : ""
      );
    });
    const cleanedArr = [...new Set(friendsIdArr)].filter(
      (item) => item !== "" && item !== userData.userId
    );

    const users: PersonDto[] = await Promise.all(
      cleanedArr.map(async (userId) => {
        const response = await oneUser(userId).then((response) => {
          return response[0];
        });
        return response;
      })
    );
    setData(users);
  });

  return (
    <div className="messenger-container p-3 rounded-lg absolute">
      <h1 className="text-white text-xl font-medium mb-3">Chats</h1>
      {data.map((item) => {
        return (
          <Fragment key={item.id}>
            <div className="flex items-center mb-3 gap-3 p-2 rounded-lg hover:bg-modalItemsHoverColor">
              <img
                className="w-14 h-14 rounded-full"
                alt="profile"
                src={item.profilePhoto}
              />
              <div className="text-white">
                <h1>{item.name + " " + item.surname}</h1>
                <span>some text</span>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default MessengerModal;
