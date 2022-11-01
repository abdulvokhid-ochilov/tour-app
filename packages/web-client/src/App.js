import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountPage from "./pages/AccountPage";
import { useEffect } from "react";
import { fetchUserProfile } from "./store/auth-actions";
import { getAllTours } from "./store/tours-actions";
import { useDispatch, useSelector } from "react-redux";
import TourPage from "./pages/TourPage";
import NotFound from "./pages/NotFound";
import { getAllBookings } from "./store/bookings-actions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    const token = localStorage.getItem("toursUserToken");
    if (token) {
      dispatch(fetchUserProfile(token, navigate));
    }

    dispatch(getAllTours());
    dispatch(getAllBookings(token));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/account/*"
          element={status ? <AccountPage /> : <NotFound />}
        />
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toaster"
      />
      <Footer />
    </div>
  );
}

export default App;
