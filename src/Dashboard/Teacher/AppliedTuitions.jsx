import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetLocation from "../../Hook/useGetLocation";
import useGetTuitions from "../../Hook/useGetTuitions";

const AppliedTuitions = () => {
  const { register, reset, watch } = useForm();
  const [districtData] = useGetLocation();
  const [query, setQuery] = useState({
    code: "all",
    gender: "all",
    district: "all",
    topThree: false,
  });
  const [data, isPending, refetch] = useGetTuitions(query);

  const codeInput = watch("code");
  const genderInput = watch("gender");
  const districtInput = watch("district");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery({
        topThree: false,
        code: codeInput || "all",
        gender: genderInput || "all",
        district: districtInput || "all",
      });
      refetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [codeInput, genderInput, districtInput, refetch]);

  if (isPending) {
    return (
      <div className="flex justify-center mt-[25%]">
        <span className="loading loading-spinner loading-lg flex"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto lg:w-[80%] mx-auto mt-24">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-4 items-center justify-center mb-16 flex-wrap pt-14 mx-auto">
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Tuition Code</th>
            <th>Salary</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((x, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{x.tuitionCode}</div>
                  </div>
                </div>
              </td>
              <td>{x.salary} BDT</td>
              <td
                className={`${
                  x.approval === "accepted"
                    ? "text-green-500"
                    : x.approval === "denied"
                    ? "text-red-500"
                    : "text-yellow-500"
                } font-bold`}
              >
                {x.approval === "accepted"
                  ? "approved"
                  : x.approval === "denied"
                  ? "denied"
                  : "pending"}
              </td>
              <th>
                <Link
                  to={`/dashboard/Teachers-Submission/${x._id}`}
                  className="btn btn-ghost btn-xs"
                >
                  details
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedTuitions;
