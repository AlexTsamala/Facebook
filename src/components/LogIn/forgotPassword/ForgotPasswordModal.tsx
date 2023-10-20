import { FC, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../fireBaseConfig";

interface IProps {
  onCancel: () => void;
  isOpen: boolean;
}

interface PasswordChangeDto {
  email: string;
}

const ForgotPasswordModal: FC<IProps> = ({ onCancel, isOpen }) => {
  const { register, handleSubmit, reset } = useForm<PasswordChangeDto>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<PasswordChangeDto> = async (data) => {
    let errorStatus = false;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
    } catch (error) {
      errorStatus = true;
      toast.error("Email not found");
      setErrorMessage("Email not found");
    } finally {
      if (!errorStatus) {
        toast.success("Reset password link was sent to your email");
        reset();
        onCancel();
      }
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel} className="modal-button-style">
        Sign Up
        <span className=" text-red-600 ml-28 font-KumbhSans font-bold">
          {errorMessage}
        </span>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody className="flex gap-2">
          <input
            type="email"
            className="create-input-styles"
            placeholder="Type your email"
            {...register("email", { required: true })}
          />
        </ModalBody>
        <ModalFooter>
          <input
            type="submit"
            className="create-input-styles w-44 bg-signUpColor text-slate-100 hover:bg-lime-500"
            value={loading ? "loading ..." : "Check"}
          />
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
