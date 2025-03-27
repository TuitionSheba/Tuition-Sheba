import PropTypes from "prop-types";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaCalendar,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPen,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import useGetLocation from "../../Hook/useGetLocation";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const AppliedApplicationsCard = ({ data, status }) => {
  const [, , , filteredDistrict, filteredUpazilla] = useGetLocation(
    data?.location?.district,
    data?.location?.upazilla
  );
  const axios = useAxiosSecure();
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
              from: "tutor",
              response: response,
              tuitionId: data._id,
              email: status[0][0].email,
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
              }
            });
        }
      });

      return;
    } else if (response === "accepted") {
      axios
        .patch("/tutor-application", {
          from: "tutor",
          response: response,
          tuitionId: data._id,
          email: status[0][0].email,
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
          }
        });

      return;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 xl:w-[350px] md:w-[330px] w-[350px]">
      <div className="bg-[#00ADB5] text-white text-lg font-semibold p-2 text-center flex flex-col items-center justify-between">
        <span className="py-2 text-center flex items-center justify-center">
          <FaChalkboardTeacher className="mr-2" /> Tuition Code:{" "}
          {data.tuitionCode}
        </span>
        <span>
          Status:{" "}
          <span
            className={`${
              status[0][0].status === "accepted" ||
              status[0][0].status === "hired"
                ? "text-green-700"
                : status[0][0].status === "rejected"
                ? "text-red-500"
                : "text-yellow-400"
            }`}
          >
            {status[0][0].status}
          </span>
        </span>
      </div>
      <div className="p-4 text-gray-700">
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">Wanted Teacher</span>
          <span>{data.gender}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaUserGraduate className="inline mr-2" /> Number of Students
          </span>
          <span>{data.studentNumber}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaPen className="inline mr-2" /> Class
          </span>
          <span>{data.class}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            {" "}
            <span className="font-semibold flex gap-1 items-center">
              <HiAcademicCap className="inline text-xl mr-2" />{" "}
              <span>Subject</span>
            </span>
          </span>
          <span>{data.medium}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="font-semibold flex gap-1 items-center">
            <FaBook className="inline mr-2" /> <span>Subject</span>
          </span>
          <span className="space-x-2 flex flex-wrap justify-end">
            {data.subjects.map((x, idx) => (
              <span key={idx}>{x}</span>
            ))}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaCalendar className="inline mr-2" /> Day
          </span>
          <span>{data.days}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaClock className="inline mr-2" /> Time
          </span>
          <span>{data.time}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaMoneyBillWave className="inline mr-2" /> Salary
          </span>
          <span>{data.salary} Taka</span>
        </div>
        <div className="py-2 border-b">
          <span className="font-semibold flex justify-center">
            <span className="font-semibold flex gap-1 items-center">
              <FaMapMarkerAlt className="inline mr-2" /> <span>Location</span>
            </span>
          </span>
          <div className="text-sm flex flex-wrap justify-center gap-4">
            <span>Upazilla :- {filteredUpazilla[0]?.name}</span>
            <span>District :- {filteredDistrict[0]?.name}</span>
          </div>
          <span className="flex justify-center mt-1">
            Area :- {data.location.area}
          </span>
        </div>
      </div>
      {status[0][0].status === "accepted" ? (
        <div className="p-4 flex justify-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
            Hired
          </button>
        </div>
      ) : status[0][0].status === "hired" ? (
        <div className="p-4 flex justify-center gap-2">
          <button
            onClick={() => handleApply("accepted")}
            className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80"
          >
            Accept
          </button>
          <button
            onClick={() => handleApply("rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80"
          >
            Reject
          </button>
        </div>
      ) : status[0][0].status === "rejected" ? (
        <div className="p-4 flex justify-center">
          <button
            onClick={handleApply}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Rejected
          </button>
        </div>
      ) : (
        <div className="p-4 flex justify-center">
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md">
            Pending
          </button>
        </div>
      )}
    </div>
  );
};

AppliedApplicationsCard.propTypes = {
  data: PropTypes.object,
  status: PropTypes.array,
};
export default AppliedApplicationsCard;
