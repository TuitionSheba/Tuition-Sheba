import { Link } from "react-router-dom";
import useGetApplications from "../../Hook/useGetApplications";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetLocation from "../../Hook/useGetLocation";

const TeachersSubmissions = () => {
  const { register, handleSubmit, reset } = useForm();
  const [districtData] = useGetLocation();
  const [queryParams, setQueryParams] = useState({
    status: "all",
    gender: "all",
    district: "all",
  });
  const [data, isPending, refetch] = useGetApplications(queryParams);
  const axios = useAxiosSecure();
  const [count, setCount] = useState(0);

  const onSubmit = (data) => {
    setQueryParams({
      status: data.status,
      gender: data.gender,
      district: data.district,
    });
    refetch();
  };

  useEffect(() => {
    axios.get("/applicator-count").then((res) => {
      setCount(res.data.count);
    });
    document.title = "Teacher's Submissions";
  }, [axios]);

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
        <p className="font-bold">number of applicators: {count}</p>
        <form onChange={handleSubmit(onSubmit)}>
          <div className="flex gap-4 items-center justify-center my-8 flex-wrap">
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
              <label className="text-lg font-medium">
                Search by Location :
              </label>
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
                  setQueryParams({
                    status: "all",
                    gender: "all",
                    district: "",
                  });
                  refetch();
                  reset();
                }}
                className="bg-[#00ADB5] hover:bg-opacity-80 text-white text-lg font-medium px-4 py-1 mt-[30px] rounded-md transition-all"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </form>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Approval</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((x, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={x.personalInformation.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {x.personalInformation.name}
                    </div>
                  </div>
                </div>
              </td>
              <td>{x.personalInformation.phoneNumber}</td>
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

export default TeachersSubmissions;
