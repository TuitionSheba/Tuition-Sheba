import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth Provider/AuthContext";

const useEmailVerified = () => {
  const { user } = useContext(AuthContext);
  const [emailVerify, setEmailVerify] = useState(false);

  useEffect(() => {
    if (user && user.emailVerified === false) {
      setEmailVerify(true);
    }
  }, [user]);

  return emailVerify;
};

export default useEmailVerified;
