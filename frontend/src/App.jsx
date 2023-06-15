import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./assets/styles/index.css";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <h1 className="title">MA TODO LIST</h1>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
