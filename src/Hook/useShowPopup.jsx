import { useNavigate } from "react-router-dom";
import useEmailVerified from "./useEmailVerified";
import Swal from "sweetalert2";

const useShowPopup = () => {
  const emailVerify = useEmailVerified();
  const navigate = useNavigate();

  const checkEmailVerification = () => {
    if (emailVerify === true) {
      navigate("/");
      Swal.fire(
        "Please verify your email otherwise you account will be deleted in 3 days"
      );
    }
  };

  return checkEmailVerification;
};

export default useShowPopup;
