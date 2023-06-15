import LoginPage from "./components/LogIn/LoginPage";
import { Navigate, Route, Routes } from "react-router";
import Homepage from "./components/homePage/HomePage";

function App() {
  return (
    <div className=" font-KumbhSans">
      <Routes>
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/home/:name" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
