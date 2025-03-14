import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import VerifyEmail from "../Components/VerifyEmail";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth Provider/AuthContext";
import useEmailVerified from "../Hook/useEmailVerified";

const MainPageRoot = () => {
  const { user } = useContext(AuthContext);
  const emailVerify = useEmailVerified();

  useEffect(() => {
    window.scroll(0, 0);
  }, [user]);
  return (
    <div>
      {emailVerify && (
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
