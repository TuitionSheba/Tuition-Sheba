import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useContext, useState } from "react";
import useGetLocation from "../../Hook/useGetLocation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth Provider/AuthContext";

const ApplicatorsDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const params = useParams();
  const axios = useAxiosSecure();
  const { data, isPending, refetch } = useQuery({
    queryKey: [params.id, "teacher-applications"],
    queryFn: async () => {
      const res = await axios.get(`/teacher-applications-details/${params.id}`);
      return res.data;
    },
  });
  const district = data?.personalInformation?.location?.district;
  const upazilla = data?.personalInformation?.location?.upazilla;
  const [, , , filteredDistrict, filteredUpazilla] = useGetLocation(
    district,
    upazilla
  );
  const [active, setActive] = useState(1);

  if (isPending || loading) {
    return;
  }

  const handleApproval = (x) => {
    if (x === 1) {
      Swal.fire({
        title: "Are you sure that you want to approve him ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22C55E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.patch(`/manage-applicators/${params.id}?approval=accepted`);
        }
      });
    }
    if (x === 0) {
      Swal.fire({
        title: "Are you sure that you want to decline him ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22C55E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel:
              "Please provide with reasoning so the applicant can improve",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
              "aria-label": "Type your message here",
            },
            showCancelButton: true,
          });
          if (text) {
            axios
              .patch(`/manage-applicators/${params.id}?approval=denied`, {
                message: text,
                name: user.displayName,
              })
              .then((res) => {
                if (res.data.acknowledged) {
                  Swal.fire("Message Sent Successfully");
                  refetch();
                }
              })
              .catch(() => {
                Swal.fire("Error, please try again later");
              });
          }
        }
      });
    }
  };

  return (
    <div>
      <Link to={"/dashboard/Teachers-Submission"}>
        <FaArrowLeftLong className="text-3xl mt-4 ml-4 cursor-pointer" />
      </Link>
      <div className="lg:w-[60%] mt-24  mx-auto">
        <div className="flex justify-center">
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={data?.personalInformation.image}
            alt=""
          />
        </div>
        <div>
          <div
            role="tablist"
            className="tabs tabs-bordered w-[400px] mx-auto my-10"
          >
            <a
              onClick={() => setActive(1)}
              role="tab"
              className={`tab ${active == 1 && "tab-active"}`}
            >
              {" "}
              Personal Information
            </a>
            <a
              onClick={() => setActive(2)}
              role="tab"
              className={`tab ${active === 2 && "tab-active"}`}
            >
              Education
            </a>
          </div>
          <div>
            <div
              className={`${
                active === 1 ? "flex" : "hidden"
              } text-lg font-medium md:flex-row flex-col md:gap-0 gap-5 justify-around md:px-0 px-8`}
            >
              {/* personal information section */}

              <div className="space-y-3">
                <h1 className="text-xl font-semibold">
                  Name : {data?.personalInformation.name}
                </h1>
                <p>Contact Email : {data?.personalInformation.email}</p>
                <p>Contact Number : {data?.personalInformation.phoneNumber}</p>
                <p>Gender : {data?.personalInformation.gender}</p>
                <p>Date of Birth : {data?.personalInformation.birthDay}</p>
              </div>
              <div className="space-y-3">
                <h1 className="text-xl font-semibold">Location :</h1>
                <p>District : {filteredDistrict[0]?.name}</p>
                <p>Upazilla : {filteredUpazilla[0]?.name}</p>
                <p>
                  Detailed location : {data?.personalInformation.location.area}
                </p>
              </div>
            </div>
            <div className={`${active === 2 ? "block" : "hidden"}`}>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Degree</th>
                      <th>Year</th>
                      <th>Board</th>
                      <th>Institute</th>
                      <th>GPA / CGP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.education.map((x, idx) => (
                      <tr key={idx}>
                        <th>{x.degree}</th>
                        <td>{x.year}</td>
                        <td>{x.board}</td>
                        <td>{x.institute}</td>
                        <td>{x.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {data.approval === null && (
          <div className="flex justify-center mr-4 gap-2 mt-12">
            <button
              className="bg-[#D84040] transition-all hover:bg-opacity-80 px-3 py-2 rounded-xl text-white cursor-pointer"
              onClick={() => handleApproval(0)}
            >
              Deny
            </button>
            <button
              className="bg-green-600 transition-all hover:bg-opacity-80 px-3 py-2 rounded-xl text-white cursor-pointer"
              onClick={() => handleApproval(1)}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicatorsDetails;
