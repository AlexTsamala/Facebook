import { FC, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser } from "../../../fireBaseConfig";

interface Props {
  onCancel: () => void;
  isOpen: boolean;
}

interface LogInDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const CreateAccountModal: FC<Props> = ({ onCancel, isOpen }) => {
  const { register, handleSubmit } = useForm<LogInDto>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<LogInDto> = async (data) => {
    setLoading(true);
    console.log(data);
    const response = await createUser(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );
    if (!response.errorStatus) {
      onCancel();
    } else {
      setErrorMessage("Email is already in use !");
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(function () {
      setErrorMessage("");
    }, 4000);
  }, [errorMessage]);

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel} className="modal-button-style">
        Sign Up
        <span className=" text-red-600 ml-28 font-KumbhSans font-bold">
          {errorMessage}
        </span>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="flex gap-2">
            <input
              className="create-input-styles"
              placeholder="First name"
              {...register("firstName", { required: true })}
            />
            <input
              className="create-input-styles"
              placeholder="Surname"
              {...register("lastName", { required: true })}
            />
          </div>
          <input
            className="mt-3 create-input-styles"
            placeholder="Email address"
            {...register("email", { required: true })}
          />
          <input
            className="mt-3 create-input-styles"
            type="password"
            placeholder="New password"
            {...register("password", { required: true })}
          />
        </ModalBody>
        <ModalFooter>
          <input
            type="submit"
            className="create-input-styles w-44 bg-signUpColor text-slate-100 hover:bg-lime-500"
            value={loading ? "loading ..." : "Sign up"}
          />
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CreateAccountModal;
