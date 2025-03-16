import { Link } from "react-router-dom";
import useGetApplications from "../../Hook/useGetApplications";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";

const TeachersSubmissions = () => {
  const [data, isPending, ,] = useGetApplications("all");
  const axios = useAxiosSecure();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("/applicator-count").then((res) => {
      setCount(res.data.count);
    });
  }, [axios]);
  if (isPending) {
    return;
  }

  return (
    <div className="overflow-x-auto lg:w-[80%] mx-auto mt-24">
      <div className="my-4">
        <p className="font-bold">number of applicators: {count}</p>
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
                  x.approval === "accepted" ? "text-green-500" : "text-red-600"
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
