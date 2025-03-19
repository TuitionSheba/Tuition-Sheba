import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import useUser from "../Hook/useUser";
import { AuthContext } from "../Auth Provider/AuthContext";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [data, userLoading] = useUser();
  const location = useLocation();

  if (loading || userLoading) {
    return (
      <div className="flex justify-center mt-[25%]">
        <span className="loading loading-spinner loading-lg flex"></span>
      </div>
    );
  }

  if (user && data.userRoll === "user") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

UserRoute.propTypes = {
  children: PropTypes.node,
};

export default UserRoute;
