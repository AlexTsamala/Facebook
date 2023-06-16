import LoginPage from "./components/LogIn/LoginPage";
import { Navigate, Route, Routes } from "react-router";
import MainPage from "./components/mainPage/MainPage";

function App() {
  return (
    <div className=" font-KumbhSans">
      <Routes>
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/home/:name" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
