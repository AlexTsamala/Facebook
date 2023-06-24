import "./searchInput.css";
import { FC } from "react";
import { PersonDto } from "../../../../../dto/PersonDto";

interface props {
  usersData: PersonDto[] | undefined;
}

const SearchInputResult: FC<props> = ({ usersData }) => {
  return (
    <div
      className={`search-input-container ${
        usersData?.length === 0 ? "flex items-center justify-center" : ""
      }`}
    >
      {usersData?.map((person: PersonDto) => {
        return (
          <div
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
