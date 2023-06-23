import { FC } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface props {
  isOpen: boolean;
  onCancel: () => void;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  yesFunction: () => void;
}

const QuestionModal: FC<props> = ({
  title,
  description,
  onCancel,
  isOpen,
  backgroundColor,
  textColor,
  yesFunction,
}) => {
  const yesButtonHandler = () => {
    yesFunction();
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader
        className="post-modal-header"
        style={{ backgroundColor: backgroundColor, color: textColor }}
        toggle={onCancel}
      >
        {title}
      </ModalHeader>
      <ModalBody style={{ backgroundColor: backgroundColor, color: textColor }}>
        {description}
      </ModalBody>
      <ModalFooter
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <button
          className="  bg-green-700 w-36 h-8 rounded-lg"
          onClick={yesButtonHandler}
          type="button"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          type="button"
          className=" bg-red-700 w-36 h-8 rounded-lg"
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default QuestionModal;
