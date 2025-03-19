import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth Provider/AuthContext";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isPending: userLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "user"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  return [data, userLoading, refetch];
};

export default useUser;
