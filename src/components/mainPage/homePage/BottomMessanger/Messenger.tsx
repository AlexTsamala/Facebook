import { useState, ChangeEvent, FC, Fragment } from "react";
import { X, Minus, Image, PlusCircle, ArrowUp } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import {
  faNoteSticky,
  faFaceSmile,
  faThumbsUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./messanger.css";
import { PersonDto } from "../../../../dto/PersonDto";
import { addMessage } from "../../../../../fireBaseConfig";
import Cookies from "js-cookie";
import { MessengerDto } from "../../../../dto/MessengerDto";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";

interface Props {
  chosenUser: PersonDto | null;
  setChosenUser: (data: PersonDto | null) => void;
}

const Messenger: FC<Props> = ({ chosenUser, setChosenUser }) => {
  const [message, setMessage] = useState<string>("");
  const [minimizeMessenger, setMinimizeMessenger] = useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [data, setData] = useState<MessengerDto[]>();

  const userData: PersonDto = JSON.parse(Cookies.get("userData") || "")[0];

  const db = getFirestore();
  const colRefPosts = collection(db, "Messages");
  const q = query(colRefPosts, orderBy("createdAt", "asc"));

  onSnapshot(q, (snapShot) => {
    const messengerArr: MessengerDto[] = [];
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
    const bothUsersMessages = currentUsersAllMessage.filter(
      (item) =>
        item.receiverId === chosenUser?.userId ||
        item.senderId === chosenUser?.userId
    );
    setData(bothUsersMessages);
  });

  const textAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmoji = (emojiObj: any) => {
    setMessage(message + emojiObj.emoji);
  };

  const sendMessageHandler = () => {
    addMessage(
      message,
      userData.userId,
      chosenUser?.userId,
      userData.profilePhoto,
      userData.name + " " + userData.surname
    );
    setMessage("");
    setEmojiPicker(false);
  };

  return (
    <div
      className={`fixed bottom-0 messenger-container-styles rounded-md ${
        minimizeMessenger && "h-12"
      } `}
    >
      <div className="flex justify-between message-header-styles">
        <div className="flex items-center cursor-pointer rounded hover:bg-messengerPhoto">
          <div className=" flex items-center justify-center w-11 h-11 rounded-md">
            <img
              className="w-8 h-8 rounded-full"
              alt="profile"
              src={chosenUser?.profilePhoto}
            />
          </div>
          <div className="rounded-md py-1.5 pr-2">
            <h4 className="font-medium text-sm text-headersColor">
              {chosenUser?.name + " " + chosenUser?.surname}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1 pr-2">
          {!minimizeMessenger ? (
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <Minus
                onClick={() => setMinimizeMessenger(true)}
                color="#0084FF"
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <ArrowUp
                onClick={() => setMinimizeMessenger(false)}
                color="#0084FF"
                className="cursor-pointer"
              />
            </div>
          )}
          <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
            <X
              onClick={() => setChosenUser(null)}
              color="#0084FF"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {minimizeMessenger ? null : (
        <div className="messages-container">
          {data?.map((item) => {
            return (
              <Fragment key={item.id}>
                {item.senderId === userData.userId ? (
                  <div className="message-styles-current">{item.message}</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full w-7 h-7"
                      alt="user"
                      src={item.profilePhoto}
                      title={item.name}
                    />
                    <div className="message-styles-other">{item.message}</div>
                  </div>
                )}
              </Fragment>
            );
          })}
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
          {emojiPicker && (
            <div className="absolute right-4 bottom-14">
              <EmojiPicker
                theme={Theme.DARK}
                emojiStyle={EmojiStyle.FACEBOOK}
                height={340}
                width={300}
                onEmojiClick={(emoji) => handleEmoji(emoji)}
              />
            </div>
          )}
          <FontAwesomeIcon
            onClick={() => setEmojiPicker(!emojiPicker)}
            style={{
              color: "#0084FF",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              position: "absolute",
              right: "60px",
            }}
            icon={faFaceSmile}
          />
          {message.length > 0 ? (
            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                onClick={sendMessageHandler}
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
