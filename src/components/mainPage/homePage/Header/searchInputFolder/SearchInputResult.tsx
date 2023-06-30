import "./searchInput.css";
import { FC } from "react";
import { PersonDto } from "../../../../../dto/PersonDto";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface props {
  usersData: PersonDto[] | undefined;
  setSearchInputOpen: (status: boolean) => void;
  setSearchInputValue: (value: string) => void;
}

const SearchInputResult: FC<props> = ({
  usersData,
  setSearchInputOpen,
  setSearchInputValue,
}) => {
  const navigate = useNavigate();

  const chosenUserHandler = (chosenUser: PersonDto) => {
    Cookies.set("chosenUserId", chosenUser.userId);
    setSearchInputOpen(false);
    navigate("/profilePage/" + chosenUser.name + chosenUser.surname);
    setSearchInputValue("");
  };
  return (
    <div
      className={`search-input-container ${
        usersData?.length === 0 ? "flex items-center justify-center" : ""
      }`}
    >
      {usersData?.map((person: PersonDto) => {
        return (
          <div
            onClick={() => chosenUserHandler(person)}
            key={person.name}
            className="flex gap-2 cursor-pointer post-buttons-style"
          >
            <img
              className="circle-styles cursor-pointer w-9 h-9"
              alt="current-user-img"
              src={person.profilePhoto}
            />
            <h3 className=" text-white">
              {person.name + " " + person.surname}
            </h3>
          </div>
        );
      })}
      {usersData?.length === 0 ? (
        <h3 className="text-white">No results</h3>
      ) : null}
    </div>
  );
};

export default SearchInputResult;
