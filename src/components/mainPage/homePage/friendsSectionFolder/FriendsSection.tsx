import { useEffect, useState } from "react";
import "./friendsSection.css";
import Cookies from "js-cookie";
import { oneUser } from "../../../../../fireBaseConfig";
import { PersonDto } from "../../../../dto/PersonDto";

const FriendsSection = () => {
  const [data, setData] = useState<PersonDto[]>([]);
  const userData = JSON.parse(Cookies.get("userData") || "");

  const loadData = async () => {
    const friendsListArr: PersonDto[] = [];
    if (userData[0].friendsList.length > 0) {
      await Promise.all(
        userData[0].friendsList.map(async (userId: string) => {
          await oneUser(userId).then(async (userArr) => {
            friendsListArr.push(userArr[0]);
          });
        })
      );
    }

    return friendsListArr;
  };

  useEffect(() => {
    loadData().then((result) => setData(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="pages-margin flex flex-col">
      <h2 className="contacts-header-styles p-2">Contacts</h2>
      {data.map((contact) => {
        return (
          <div className="flex items-center gap-2 p-2 cursor-pointer w-56 rounded-lg hover:bg-stone-600">
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
    </div>
  );
};

export default FriendsSection;
