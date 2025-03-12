import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import VerifyEmail from "../Components/VerifyEmail";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth Provider/AuthContext";

const MainPageRoot = () => {
  const { user } = useContext(AuthContext);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  useEffect(() => {
    if (user && user.emailVerified === false) {
      // Only show VerifyEmail if user is loaded and NOT verified
      setShowVerifyEmail(true);
    }
    window.scroll(0, 0);
  }, [user]);
  return (
    <div>
      {showVerifyEmail && (
        <div className="z-50 fixed mt-8">
          <VerifyEmail />
        </div>
      )}
      <div className="w-full fixed z-50">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainPageRoot;
