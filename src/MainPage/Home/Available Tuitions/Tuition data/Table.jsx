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
import useGetLocation from "../../../../Hook/useGetLocation";
import useUser from "../../../../Hook/useUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TuitionCard = ({ data }) => {
  const [, , , filteredDistrict, filteredUpazilla] = useGetLocation(
    data?.location?.district,
    data?.location?.upazilla
  );
  const [userData, userLoading] = useUser();
  const [validity, setValidity] = useState(false);
  const [pending, setPending] = useState("");

  const handleApply = () => {
    Swal.fire({
      title: "application received successfully, you'll be notified soon",
      showDenyButton: true,
      confirmButtonText: "see all applied tuitions",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href = "/dashboard/notifications";
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

  if (userLoading) {
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  return (
    // <div className="card bg-base-100 md:w-96 w-[350px] shadow-2xl">
    //   <figure>
    //     <img
    //       className="xl:h-[300px]"
    //       src={data.personalInformation.image}
    //       alt="Shoes"
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h1 className="text-xl font-bold">
    //       {data.personalInformation.name} ,{" "}
    //       <span className="font-medium text-lg">
    //         {data.personalInformation.gender}
    //       </span>
    //     </h1>
    //     <div>
    //       <div className="font-medium text-lg space-y-2">
    //         <h3 className="space-x-3">
    //           Class :{" "}
    //           {data.preference.preferredClass.map((x, idx) => (
    //             <span key={idx}>{x.label}</span>
    //           ))}
    //         </h3>
    //         <h3>Teaching Style : Adding Soon</h3>
    //         <h3 className="space-x-3">
    //           Location : {filteredUpazilla[0]?.name}
    //         </h3>
    //         <h3 className="space-x-3">
    //           Salary : {data.personalInformation.salary} BDT
    //         </h3>
    //       </div>
    //     </div>
    //     <div className="flex justify-end">
    //       <Link
    //         to={`/Teachers-details/${data._id}`}
    //         className="bg-[#00ADB5] hover:bg-opacity-80 text-white transition-all px-3 py-2 rounded-xl"
    //       >
    //         See Details
    //       </Link>
    //     </div>
    //   </div>
    // </div>
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
        {validity ? (
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
