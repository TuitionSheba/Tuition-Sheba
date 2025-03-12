import PropTypes from "prop-types";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaCalendar,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TuitionCard = ({ data }) => {
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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-[#00ADB5] text-white text-lg font-semibold py-2 text-center flex items-center justify-center">
        <FaChalkboardTeacher className="mr-2" /> Tuition Code: 5618
      </div>
      <div className="p-4 text-gray-700">
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">Wanted Teacher</span>
          <span>Male</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaUserGraduate className="inline mr-2" /> Number of Students
          </span>
          <span>1</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaBook className="inline mr-2" /> Class
          </span>
          <span>4</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">Medium</span>
          <span>Bangla</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">Subject</span>
          <span>All</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaCalendar className="inline mr-2" /> Day
          </span>
          <span>4</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaClock className="inline mr-2" /> Time
          </span>
          <span>5.30 PM</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaMoneyBillWave className="inline mr-2" /> Salary
          </span>
          <span>3000 Taka</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">
            <FaMapMarkerAlt className="inline mr-2" /> Location
          </span>
          <span className="text-sm">
            Dewanhat mor e basa, just 1 minute lagbe, Dewanhat
          </span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold">Joining</span>
          <span>As Soon as</span>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <button className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

TuitionCard.propTypes = {
  data: PropTypes.array,
};
export default TuitionCard;
