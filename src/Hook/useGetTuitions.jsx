import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetTuitions = (type) => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: [type, "requirements-application"],
    enabled: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requirements-application/${type}`);
      return res.data;
    },
  });

  return [data, isPending];
};

export default useGetTuitions;
