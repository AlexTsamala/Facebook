import { ChangeEvent, FC, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import profileImg from "../../../assets/სანდროწამალაშვილი.jpg";
import Cookies from "js-cookie";

interface Props {
  onCancel: () => void;
  isOpen: boolean;
}

const CreatePostModal: FC<Props> = ({ isOpen, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const [disableStatus, setDisableStatus] = useState<boolean>(true);
  const userName = JSON.parse(Cookies.get("userData") || "")[0].name;
  const surName = JSON.parse(Cookies.get("userData") || "")[0].surname;
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 0) {
      setDisableStatus(false);
    } else {
      setDisableStatus(true);
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader className="post-modal-header">Create post</ModalHeader>
      <ModalBody className="post-modal-body">
        <div className="flex items-center gap-2 mb-3">
          <img
            className="circle-styles cursor-pointer"
            alt="current-user-img"
            src={profileImg}
          />
          <div>
            <h3 className="text-white">{userName + " " + surName}</h3>
            <div className="text-white">hello</div>
          </div>
        </div>

        <textarea
          className="create-post-input"
          placeholder={`What's on your mind, ${userName}?`}
          name="postText"
          rows={4}
          cols={50}
          onChange={handleInputChange}
        />
        <div className="text-white">hi alex</div>
      </ModalBody>
      <ModalFooter className="post-modal-footer">
        <button
          disabled={disableStatus}
          className={`create-post-button ${
            inputValue.length > 0 ? "active-post-button" : ""
          }`}
          type="button"
        >
          Post
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePostModal;
