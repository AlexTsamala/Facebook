import { useState, FC } from "react";
import "./friendsSection.css";
import Cookies from "js-cookie";
import { PersonDto } from "../../../../dto/PersonDto";
import Messenger from "../BottomMessanger/Messenger";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
} from "firebase/firestore";

const FriendsSection: FC = () => {
  const [data, setData] = useState<PersonDto[]>([]);
  const [chosenUser, setChosenUser] = useState<PersonDto | null>();
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

  const db = getFirestore();
  const colRefPosts = collection(db, "Users");
  const q = query(colRefPosts);

  onSnapshot(q, (snapShot) => {
    const usersArr: PersonDto[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const usersData = doc.data() as any;
      const users = { id: doc.id, ...usersData };
      usersArr.push(users);
    });
    const currentUserData = usersArr.filter(
      (item) => item.userId === userData.userId
    )[0].friendsList;
    const friendsListArr: PersonDto[] = [];
    if (currentUserData.length > 0) {
      currentUserData.map((id) => {
        friendsListArr.push(usersArr.filter((item) => item.userId === id)[0]);
      });
    }
    setData(friendsListArr);
  });

  const handleMessenger = (chosenUserData: PersonDto) => {
    setChosenUser(chosenUserData);
  };

  return (
    <div className="pages-margin flex flex-col">
      <h2 className="contacts-header-styles p-2">Contacts</h2>
      {data.map((contact) => {
        return (
          <div
            onClick={() => handleMessenger(contact)}
            key={contact.id}
            className="flex items-center gap-2 p-2 cursor-pointer w-56 rounded-lg hover:bg-stone-600"
          >
            <img
              className="w-9 h-9 rounded-full"
              alt="friend"
              src={contact.profilePhoto}
            />
            <h3 className="text-white font-medium">
              {contact.name} {contact.surname}
            </h3>
          </div>
        );
      })}
      {chosenUser && (
        <Messenger chosenUser={chosenUser} setChosenUser={setChosenUser} />
      )}
    </div>
  );
};

export default FriendsSection;
