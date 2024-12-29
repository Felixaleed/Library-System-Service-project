import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"; // Adjust the path accordingly
import LoginPage from "./pages/LoginPage"; // Your login page
import HomePage from "./pages/HomePage"; // Your homepage
import CRUDPage from "./pages/CRUDPage";
<<<<<<< HEAD
import UsersProfile from "./pages/UsersProfile";
=======
>>>>>>> 03b7166ebf27f343c71c9ebf6a12f689a8b1ef5b
import AdminPage from "./pages/AdminPage";

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
=======
>>>>>>> 03b7166ebf27f343c71c9ebf6a12f689a8b1ef5b
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
