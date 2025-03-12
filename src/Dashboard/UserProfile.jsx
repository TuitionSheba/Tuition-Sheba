import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="max-w-xl mx-auto mt-[15%]">
      <div className="flex items-center gap-5">
        <img className="rounded-full" src={user?.photoURL} alt="" />
        <h1 className="text-2xl font-semibold">{user.displayName}</h1>
      </div>
    </div>
  );
};

export default UserProfile;
