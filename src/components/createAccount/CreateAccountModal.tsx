import { FC } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  onCancel: () => void;
  isOpen: boolean;
}

interface LogInDto {
  firstName: string;
  lastName: string;
  surname: string;
  password: string;
  email: string;
}

const CreateAccountModal: FC<Props> = ({ onCancel, isOpen }) => {
  const { register, handleSubmit } = useForm<LogInDto>();

  const onSubmit: SubmitHandler<LogInDto> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Sign Up</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="flex gap-2">
            <input
              className="create-input-styles"
              placeholder="First name"
              {...(register("firstName"), { required: true })}
            />
            <input
              className="create-input-styles"
              placeholder="Surname"
              {...(register("surname"), { required: true })}
            />
          </div>
          <input
            className="mt-3 create-input-styles"
            placeholder="Mobile number or email address"
            {...(register("email"), { required: true })}
          />
          <input
            className="mt-3 create-input-styles"
            type="password"
            placeholder="New password"
            {...(register("password"), { required: true })}
          />
        </ModalBody>
        <ModalFooter>
          <input
            type="submit"
            className="create-input-styles w-44 bg-signUpColor text-slate-100 hover:bg-lime-500"
            value="Sign up"
          />
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CreateAccountModal;
