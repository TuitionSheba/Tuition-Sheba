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
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth Provider/AuthContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useGetLocation from "../Hook/useGetLocation";
import useUser from "../Hook/useUser";

const TuitionCard = ({ data }) => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [, , , filteredDistrict, filteredUpazilla] = useGetLocation(
    data?.location?.district,
    data?.location?.upazilla
  );
  const [userData] = useUser();
  const [validity, setValidity] = useState(false);
  const [pending, setPending] = useState("");

  const handleApply = () => {
    axios
      .patch("/tutor-application", {
        email: user.email,
        tuitionId: data._id,
        employerEmail: data.email,
        apply: true,
      })
      .then((res) => {
        if (res.data.acknowledged && res.data.modifiedCount > 0) {
          Swal.fire({
            title: "application received successfully, you'll be notified soon",
            showDenyButton: true,
            confirmButtonText: "see all applied tuitions",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/dashboard/Applied-Tuitions";
            }
          });
        }
      });
  };

  useEffect(() => {
    if (userData?.pending === true) {
      setPending("/dashboard/notifications");
    } else if (userData?.pending === undefined || false) {
      setPending("/Teacher-Application");
    }

    if (userData?.userRoll === "teacher") {
      setValidity(true);
    }
  }, [userData?.pending, userData?.userRoll]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 md:w-[380px] w-[350px]">
      <div className="bg-[#00ADB5] text-white text-lg font-semibold py-2 text-center flex items-center justify-center">
        <FaChalkboardTeacher className="mr-2" /> Tuition Code:{" "}
        {data.tuitionCode}
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
      <div className="p-4 flex justify-center">
        {data.tutorFound ? (
          <button className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg shadow-md">
            Tutor Found
          </button>
        ) : validity ? (
          <button
            onClick={handleApply}
            className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80"
          >
            Apply Now
          </button>
        ) : (
          <Link
            className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80"
            to={pending}
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
};

TuitionCard.propTypes = {
  data: PropTypes.array,
};
export default TuitionCard;
