import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CardSkeleton from "../../Components/CardSkeleton";
import HiredTutorCard from "./HiredTutorCard";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../Auth Provider/AuthContext";

const HiredTutors = () => {
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data, isPending } = useQuery({
    queryKey: [user, "hired-tutors"],
    queryFn: async () => {
      const res = await axios.get(`/hired-tutors?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="xl:w-[1000px] mx-auto md:mt-24">
      {data?.length === 0 || undefined ? (
        <div className="flex justify-center items-center">
          <h1>No data found</h1>
        </div>
      ) : isPending ? (
        <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="my-8 grid xl:grid-cols-[350px_350px_350px] md:grid-cols-[330px_330px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
          {data?.map((x, idx) => (
            <HiredTutorCard key={idx} data={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HiredTutors;
