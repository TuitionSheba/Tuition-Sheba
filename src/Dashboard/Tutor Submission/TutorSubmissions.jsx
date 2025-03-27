import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { AuthContext } from "../../Auth Provider/AuthContext";
import CardSkeleton from "../../Components/CardSkeleton";
import { useForm } from "react-hook-form";
import useGetLocation from "../../Hook/useGetLocation";
import SubmissionCard from "./SubmissionCard";

const TutorSubmissions = () => {
  const axios = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { register, reset, watch } = useForm();
  const [query, setQuery] = useState({
    code: "all",
    gender: "all",
    district: "all",
    status: "all",
  });
  const [districtData] = useGetLocation();
  const { data, isPending, refetch } = useQuery({
    queryKey: [query, "tutor-application"],
    queryFn: async () => {
      const res = await axios.get(
        `/tutor-application/${user.email}?from=client&code=${query.code}&gender=all&district=${query.district}&status=${query.status}`
      );
      return res.data;
    },
  });

  const codeInput = watch("code");
  const genderInput = watch("gender");
  const districtInput = watch("district");
  const statusInput = watch("status");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery({
        code: codeInput || "all",
        district: districtInput || "all",
        status: statusInput || "all,",
      });
      refetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [codeInput, districtInput, genderInput, refetch, statusInput]);
  return (
    <div className="xl:w-[1000px] mx-auto md:mt-24">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex md:flex-row flex-col md:gap-4 gap-12 items-center justify-center md:mb-16 md:flex-wrap pt-14 mx-auto">
          <div className="-mt-4">
            <label className="text-lg font-medium">
              Filter by tuition code :
            </label>
            <div className="h-[18px]">
              <input
                {...register("code")}
                type="number"
                placeholder="Code"
                className="input w-[200px] input-bordered h-[38px]"
              />
            </div>
          </div>
          <div className="-mt-5">
            <label className="text-lg font-medium">Filter by status :</label>
            <div className="h-[18px]">
              <select
                className="select-bordered border shadow-sm rounded-lg p-2 w-[200px] h-[40px] cursor-pointer"
                {...register("status")}
              >
                <option value="all">All</option>
                <option value="pending">pending</option>
                <option value="hired">hired</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col xl:mt-0 md:mt-5 -mt-5">
            <label className="text-lg font-medium">Search by Location :</label>
            <select
              {...register("district")}
              className="select-bordered border shadow-sm rounded-lg p-2 w-[200px] h-[40px] cursor-pointer"
              placeholder="Select District"
            >
              <option value="all">All</option>
              {districtData.map((x, idx) => (
                <option key={idx} value={`${x.id}`}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <div className="xl:mt-0 md:mt-4 -mt-8">
            <button
              type="button"
              onClick={() => {
                reset({
                  code: "",
                  gender: "all",
                  district: "all",
                });
                setQuery({
                  code: "all",
                  gender: "all",
                  district: "all",
                  status: "all",
                });
                refetch();
              }}
              className="bg-[#00ADB5] hover:bg-opacity-80 text-white text-lg font-medium px-4 py-1 mt-[30px] rounded-md transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
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
            <SubmissionCard key={idx} data={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorSubmissions;
