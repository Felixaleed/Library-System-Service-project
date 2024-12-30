import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"; // Adjust the path accordingly
import LoginPage from "./pages/LoginPage"; // Your login page
import HomePage from "./pages/HomePage"; // Your homepage
import CRUDPage from "./pages/CRUDPage";
import UsersProfile from "./pages/UsersProfile";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-books" element={<CRUDPage />} />
        <Route path="/manage-users" element={<UsersProfile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
