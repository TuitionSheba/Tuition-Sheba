import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetApplications = (type) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allApplicants,
    isPending: allApplicantsLoading,
    refetch,
  } = useQuery({
    queryKey: [type, "teacher-applications"],
    enabled: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-applications?gender=${type.gender}&status=${type.status}&district=${type.district}`
      );
      return res.data;
    },
  });

  return [allApplicants, allApplicantsLoading, refetch];
};

export default useGetApplications;
