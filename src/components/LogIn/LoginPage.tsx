import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ResentLogIns from "./RecentLogIns";
import "./logIn.css";
import CreateAccountModal from "../createAccount/CreateAccountModal";
import { signInUser, oneUser } from "../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

interface LogInDto {
  user: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInDto>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LogInDto> = async (data) => {
    const response = await signInUser(data.user, data.password);
    const { logInStatus, errorMessage } = response;
    const userData: any = response.userData;
    if (logInStatus) {
      navigate("/home/ალექსანდრეწამალაშვილი");
      Cookies.set("userToken", userData?.accessToken);
      const response = await oneUser(userData?.email);
      Cookies.set("userToken", JSON.stringify(response));
    } else {
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        setErrorMessage("Invalid email");
      } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("User not found");
      } else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        setErrorMessage("Wrong password");
      }
    }
  };
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="logIn-container">
      <form className="logIn-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="logIn-input"
          placeholder="Email address or phone number  "
          {...register("user")}
        />
        <div className="relative">
          <input
            className="logIn-input"
            placeholder="Password"
            {...register("password", { required: true })}
            type={passwordVisible ? "text" : "password"}
          />

          {passwordVisible ? (
            <FaEyeSlash
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEye
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>

        {errors.password && (
          <span className="error-message-style">This field is required</span>
        )}
        {errorMessage && (
          <span className="error-message-style">{errorMessage}</span>
        )}

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
