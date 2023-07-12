import { useState, ChangeEvent } from "react";
import { X, Minus, Image, PlusCircle, ArrowUp } from "react-feather";
import testPicture from "../../../../assets/სანდროწამალაშვილი.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faFaceSmile,
  faThumbsUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./messanger.css";

const Messenger = () => {
  const [message, setMessage] = useState<string>("");
  const [minimizeMessenger, setMinimizeMessenger] = useState<boolean>(false);
  const textAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div
      className={`fixed bottom-0 messenger-container-styles rounded-md ${
        minimizeMessenger && "h-12"
      } `}
    >
      <div className="flex justify-between">
        <div className="flex items-center cursor-pointer rounded hover:bg-messengerPhoto">
          <div className=" flex items-center justify-center w-11 h-11 rounded-md">
            <img
              className="w-8 h-8 rounded-full"
              alt="profile"
              src={testPicture}
            />
          </div>
          <div className="rounded-md py-1.5 pr-2">
            <h4 className="font-medium text-base text-headersColor">
              Sandro Tsamalashvili
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1 pr-2">
          {!minimizeMessenger ? (
            <Minus
              onClick={() => setMinimizeMessenger(true)}
              color="#0084FF"
              className="cursor-pointer"
            />
          ) : (
            <ArrowUp
              onClick={() => setMinimizeMessenger(false)}
              color="#0084FF"
              className="cursor-pointer"
            />
          )}
          <X color="#0084FF" className="cursor-pointer" />
        </div>
      </div>
      {minimizeMessenger ? null : (
        <div className="messages-container">
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
          <div className=" text-white">
            Check for any errors or warnings in the Firebase console: After
            updating the security rules, check the Firebase console for any
            error or warning messages related to the rules. These messages can
            provide additional details about what might be causing the issue.
          </div>
        </div>
      )}
      {minimizeMessenger ? null : (
        <div className="h-10 flex justify-between items-center pr-4 relative">
          <div className="flex justify-center items-center gap-3 pl-2">
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <PlusCircle color="#0084FF" className="cursor-pointer" />
            </div>
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <Image color="#0084FF" className="cursor-pointer" />
            </div>
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                style={{
                  color: "#0084FF",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                icon={faNoteSticky}
              />
            </div>
          </div>
          <textarea
            className={`message-input ${
              message.length > 0 ? "message-input-extra-styles" : "test"
            }`}
            placeholder={`Aa`}
            name="postText"
            rows={4}
            cols={50}
            onChange={textAreaHandler}
            value={message}
          />
          {message.length > 0 ? (
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                style={{
                  color: "#0084FF",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",

                  rotate: "45deg",
                }}
                icon={faPaperPlane}
              />
            </div>
          ) : (
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                style={{
                  color: "#0084FF",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                icon={faThumbsUp}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messenger;
