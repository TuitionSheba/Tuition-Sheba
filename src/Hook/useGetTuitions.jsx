import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useGetTuitions = (type) => {
  const axiosPublic = useAxiosPublic();

  const { data, isPending, refetch } = useQuery({
    queryKey: [type, "requirements-application"],
    enabled: true,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/requirements-application?topThree=${type.topThree}&gender=${type.gender}&district=${type.district}&code=${type.code}`
      );
      return res.data;
    },
  });

  return [data, isPending, refetch];
};

export default useGetTuitions;
