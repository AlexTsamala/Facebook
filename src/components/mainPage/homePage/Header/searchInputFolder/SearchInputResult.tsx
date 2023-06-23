import "./searchInput.css";
import { PersonDto } from "../../../../../dto/PersonDto";
import { FC } from "react";

const SearchInputResult: FC = () => {
  const data = [
    { name: "ზაზა", surname: "ლაღიძე", profilePhoto: "", email: "" },
    { name: "მარიამ", surname: "ბენიძე", profilePhoto: "", email: "" },
    { name: "გიორგი", surname: "მენთეშაშვილი", profilePhoto: "", email: "" },
  ];

  return (
    <div className="search-input-container">
      {data.map((person: PersonDto) => {
        return (
          <div
            key={person.name}
            className="flex justify-between gap-2 cursor-pointer post-buttons-style"
          >
            <h3 className=" text-white">{person.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default SearchInputResult;
