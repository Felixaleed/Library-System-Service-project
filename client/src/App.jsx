import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"; // Adjust the path accordingly
import LoginPage from "./pages/LoginPage"; // Your login page
import HomePage from "./pages/HomePage"; // Your homepage
import CRUDPage from "./pages/CRUDPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-books" element={<CRUDPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
