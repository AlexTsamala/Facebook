import { useForm, SubmitHandler } from "react-hook-form";
import ResentLogIns from "./RecentLogIns";
import "./logIn.css";
import CreateAccountModal from "../createAccount/CreateAccountModal";
import { useState } from "react";
import { users, addUser, deleteUser } from "../../../fireBaseConfig";

interface LogInDto {
  user: string | number;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInDto>();
  const onSubmit: SubmitHandler<LogInDto> = (data) => console.log(data);
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);

  // addUser();
  // deleteUser();

  console.log(
    users?.map((item: any) => {
      console.log(item);
    })
  );

  return (
    <div className="logIn-container">
      <form className="logIn-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="logIn-input"
          placeholder="Email address or phone number  "
          {...register("user")}
        />

        <input
          className="logIn-input"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        {errors.password && <span>This field is required</span>}

        <input className="submit-button" type="submit" value="Log in" />
        <a className="forgot-password-link" href="">
          Forgotten password ?
        </a>
        <hr className="hr-line" />
        <button
          onClick={() => setCreateIsOpen(true)}
          className="create-account-button"
          type="button"
        >
          Create new account
        </button>
      </form>
      <ResentLogIns />
      <CreateAccountModal
        isOpen={createIsOpen}
        onCancel={() => setCreateIsOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
