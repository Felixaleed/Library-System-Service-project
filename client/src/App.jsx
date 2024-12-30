import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"; // Adjust the path accordingly
import LoginPage from "./pages/LoginPage"; // Your login page
import HomePage from "./pages/HomePage"; // Your homepage
import CRUDPage from "./pages/CRUDPage";
<<<<<<< HEAD
import UsersProfile from "./pages/UsersProfile";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
=======
<<<<<<< HEAD
import UsersProfile from "./pages/UsersProfile";
=======
>>>>>>> 03b7166ebf27f343c71c9ebf6a12f689a8b1ef5b
import AdminPage from "./pages/AdminPage";
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-books" element={<CRUDPage />} />
<<<<<<< HEAD
        <Route path="/manage-users" element={<UsersProfile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} /> 
=======
<<<<<<< HEAD
        <Route path="/manage-users" element={<UsersProfile />} />
=======
>>>>>>> 03b7166ebf27f343c71c9ebf6a12f689a8b1ef5b
        <Route path="/admin" element={<AdminPage />} />
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
      </Routes>
    </Router>
  );
}

export default App;
