import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useGetLocation from "../../Hook/useGetLocation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const TeachersDetails = () => {
  const params = useParams();
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: [params, "teacher-applications"],
    queryFn: async () => {
      const res = await axios.get(
        `/teacher-applications-details/${params.tutorId}`
      );
      return res.data;
    },
  });
  const { data: requirementData, isPending: loading } = useQuery({
    queryKey: [params, "tutor-application"],
    queryFn: async () => {
      const res = await axios.get(`/tutor-submissions/${params.requirementId}`);
      return res.data;
    },
  });
  const district = data?.personalInformation?.location?.district;
  const upazilla = data?.personalInformation?.location?.upazilla;
  const [, , , filteredDistrict, filteredUpazilla] = useGetLocation(
    district,
    upazilla
  );

  useEffect(() => {
    document.title = "Teacher Details";
  }, []);

  if (isPending || loading) {
    return;
  }

  const handleApply = (response) => {
    if (response === "rejected") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Reject",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch("/tutor-application", {
              from: "client",
              response: response,
              tuitionId: params.requirementId,
              email: requirementData[0].personalInformation.email,
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Tuition Rejected",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard/Tutor-Submissions");
              }
            });
        }
      });

      return;
    } else if (response === "hired") {
      axios
        .patch("/tutor-application", {
          from: "client",
          response: response,
          tuitionId: params.requirementId,
          email: requirementData[0].personalInformation.email,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Tuition Accepted",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/Tutor-Submissions");
          }
        });

      return;
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto pb-12 pt-28 grid lg:grid-cols-[300px_4px_1fr] md:grid-cols-[250px_4px_1fr] grid-cols-1">
      <div>
        <div className="flex justify-center">
          <img
            className="xl:w-[250px] xl:h-[250px] lg:w-[200px] lg:h-[200px] md:w-[150px] md:h-[150px] w-[200px] h-[200px] rounded-full"
            src={data.personalInformation.image}
            alt=""
          />
        </div>
        <div className="font-medium text-lg space-y-2 my-5 px-6">
          <h1 className="text-xl font-bold text-center">
            {data.personalInformation.name}
          </h1>
          <h3>
            <span className="font-semibold">Gender :</span>{" "}
            {data.personalInformation.gender}
          </h3>
          <h3>
            <span className="font-semibold">Phone :</span>{" "}
            {data.personalInformation.phoneNumber}
          </h3>
          <h3>
            <span className="font-semibold">Salary :</span>{" "}
            {data.personalInformation.salary} BDT
          </h3>
          <h3>
            <span className="font-semibold">District :</span>{" "}
            {filteredDistrict[0]?.name}
          </h3>
          <h3>
            <span className="font-semibold">Upazilla :</span>{" "}
            {filteredUpazilla[0]?.name}
          </h3>
          <h3>
            <span className="font-semibold">Area :</span>{" "}
            {data.personalInformation.location.area}
          </h3>
        </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="pl-10">
        <h1 className="text-2xl font-semibold text-center mt-2">Education</h1>
        <div className="overflow-x-auto mt-12 mx-auto">
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
      <div>
        <div className="flex justify-center mr-4 gap-2 mt-12">
          <button
            onClick={() => handleApply("hired")}
            className="bg-[#00ADB5] transition-all hover:bg-opacity-80 px-8 py-2 rounded-xl text-white cursor-pointer"
          >
            Hire
          </button>
          <button
            onClick={() => handleApply("rejected")}
            className="bg-red-500 transition-all hover:bg-opacity-80 lg:px-5 px-3 py-2 rounded-xl text-white cursor-pointer flex gap-1 items-center"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachersDetails;
