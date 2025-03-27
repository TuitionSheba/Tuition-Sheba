import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetLocation from "../../Hook/useGetLocation";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../Auth Provider/AuthContext";
import CardSkeleton from "../../Components/CardSkeleton";
import AppliedApplicationsCard from "./AppliedApplicationsCard";

const AppliedTuitions = () => {
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { register, reset, watch } = useForm();
  const [districtData] = useGetLocation();
  const [query, setQuery] = useState({
    code: "all",
    gender: "all",
    district: "all",
    status: "all",
  });
  const [status, setStatus] = useState([]);

  const { data, isPending, refetch } = useQuery({
    queryKey: [query, "tutor-application"],
    queryFn: async () => {
      const res = await axios.get(
        `/tutor-application/${user.email}?from=teacher&code=${query.code}&gender=${query.gender}&district=${query.district}&status=${query.status}`
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
        gender: genderInput || "all",
        district: districtInput || "all",
        status: statusInput || "all,",
      });
      refetch();
    }, 500);

    const filter = data?.map((x) =>
      x.appliedTutor?.filter((y) => y.email === user.email)
    );

    setStatus(filter);

    return () => clearTimeout(timeout);
  }, [
    codeInput,
    data,
    districtInput,
    genderInput,
    refetch,
    statusInput,
    user.email,
  ]);

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
            <label className="text-lg font-medium">Filter by Gender :</label>
            <div className="h-[18px]">
              <select
                className="select-bordered border shadow-sm rounded-lg p-2 w-[200px] h-[40px] cursor-pointer"
                {...register("gender")}
              >
                <option value="all">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                <option value="denied">denied</option>
                <option value="pending">pending</option>
                <option value="approved">approved</option>
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
      {status?.length !== 0 ? (
        isPending || status === undefined ? (
          <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="my-8 grid xl:grid-cols-[350px_350px_350px] md:grid-cols-[330px_330px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
            {data?.map((x, idx) => (
              <AppliedApplicationsCard key={idx} data={x} status={status} />
            ))}
          </div>
        )
      ) : (
        <div className="flex justify-center items-center">
          <h1>No data found</h1>
        </div>
      )}
    </div>
  );
};

export default AppliedTuitions;
