import { useEffect, useState, FC } from "react";
import "./friendsSection.css";
import Cookies from "js-cookie";
import { oneUser } from "../../../../../fireBaseConfig";
import { PersonDto } from "../../../../dto/PersonDto";
import Messenger from "../BottomMessanger/Messenger";

const FriendsSection: FC = () => {
  const [data, setData] = useState<PersonDto[]>([]);

  const userData = JSON.parse(Cookies.get("userData") || "");

  const loadData = async (friendsArr: string[]) => {
    const friendsListArr: PersonDto[] = [];
    if (friendsArr.length > 0) {
      await Promise.all(
        friendsArr.map(async (userId: string) => {
          await oneUser(userId).then(async (userArr) => {
            friendsListArr.push(userArr[0]);
          });
        })
      );
    }

    return friendsListArr;
  };

  useEffect(() => {
    const fetchData = async () => {
      oneUser(userData[0].userId).then(async (response) => {
        await loadData(response[0].friendsList).then((result) =>
          setData(result)
        );
      });
    };
    fetchData();
  }, [userData, data]);

  return (
    <div className="pages-margin flex flex-col">
      <h2 className="contacts-header-styles p-2">Contacts</h2>
      {data.map((contact) => {
        return (
          <div
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
      <Messenger />
    </div>
  );
};

export default FriendsSection;
