import MyPhoto from "../../assets/სანდროწამალაშვილი.jpg";

const LogInCards = () => {
  return (
    <div className="card-section cursor-pointer w-40 h-52 rounded-md ml-5 mt-6">
      <img alt="userImg" className="card-img " src={MyPhoto} />
      <div className="logIn-card-footer">Sandro</div>
    </div>
  );
};

export default LogInCards;
