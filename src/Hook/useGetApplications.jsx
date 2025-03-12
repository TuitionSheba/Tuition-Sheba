import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetApplications = (type) => {
  const axiosSecure = useAxiosSecure();

  const { data: allApplicants, isPending: allApplicantsLoading } = useQuery({
    queryKey: ["teacher-applications"],
    enabled: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-applications/${type}`);
      return res.data;
    },
  });

  return [allApplicants, allApplicantsLoading];
};

export default useGetApplications;
