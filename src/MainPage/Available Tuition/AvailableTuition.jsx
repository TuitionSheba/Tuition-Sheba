import useGetTuitions from "../../Hook/useGetTuitions";
import useGetLocation from "../../Hook/useGetLocation";
import { useForm } from "react-hook-form";
import TuitionCard from "../Home/Available Tuitions/Tuition data/Table";
import { useEffect, useState } from "react";

const AvailableTuition = () => {
  const { register, reset, watch } = useForm();
  const [districtData] = useGetLocation();
  const [query, setQuery] = useState({
    code: "all",
    gender: "all",
    district: "all",
    topThree: false,
  });
  const [data, isPending, refetch] = useGetTuitions(query);

  // Watch input values without triggering re-renders
  const codeInput = watch("code");
  const genderInput = watch("gender");
  const districtInput = watch("district");

  // Debounce filtering to avoid refetching on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery({
        topThree: false,
        code: codeInput || "all",
        gender: genderInput || "all",
        district: districtInput || "all",
      });
      refetch();
    }, 500); // Delays state update by 500ms

    return () => clearTimeout(timeout);
  }, [codeInput, genderInput, districtInput, refetch]);

  if (isPending) {
    return (
      <div className="flex justify-center md:pt-[20%] pt-[50%] mb-[225px]">
        <span className="loading loading-spinner loading-lg flex"></span>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="flex gap-4 items-center justify-center mb-8 flex-wrap pt-28">
          <div className="-mt-4">
            <label className="text-lg font-medium">
              Filter by tuition code :
            </label>
            <div className="h-[18px]">
              <input
                {...register("code")}
                type="number"
                placeholder="Code"
                className="input input-bordered h-[38px]"
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
          <div className="flex flex-col">
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
          <div>
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
                  topThree: false,
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

      <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
        {data?.map((x, idx) => (
          <TuitionCard key={idx} data={x} />
        ))}
      </div>
    </div>
  );
};

export default AvailableTuition;
