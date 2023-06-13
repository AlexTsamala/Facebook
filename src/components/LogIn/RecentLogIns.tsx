import FacebookImg from "../../assets/images.png";
import LogInCards from "./LogInCards";

const ResentLogIns = () => {
  return (
    <div>
      <img className="facebook-img" alt="facebook img" src={FacebookImg} />
      <h2 className="text-2xl font-medium ml-5">Recent logins</h2>
      <p className=" text-gray-500 ml-5">
        Click your picture or add an account.
      </p>
      <LogInCards />
    </div>
  );
};

export default ResentLogIns;
