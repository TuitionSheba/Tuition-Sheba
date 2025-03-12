import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useGetLocation from "../../../../Hook/useGetLocation";
import { useEffect } from "react";

const TeachersDetails = () => {
  const params = useParams();
  const axios = useAxiosSecure();
  const { data, isPending } = useQuery({
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

  useEffect(() => {
    document.title = "Teacher Details";
  }, []);

  if (isPending) {
    return;
  }
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
        <div>
          <h1 className="text-2xl font-semibold text-center mt-12">
            Tuition Details
          </h1>
          <div className="lg:text-2xl space-y-3 mt-5">
            <h3 className="space-x-3">
              <span className="font-semibold">Class :</span>{" "}
              {data.preference.preferredClass.map((x, idx) => (
                <span key={idx}>{x.label}</span>
              ))}
            </h3>
            <h3 className="space-x-3">
              <span className="font-semibold">Preferred Time :</span>{" "}
              {data.preference.preferredTime.map((x, idx) => (
                <span key={idx}>{x.label}</span>
              ))}
            </h3>
            <h3>
              <span className="font-semibold">AvailableDays :</span>{" "}
              {data.preference.availableDays} days in a Week
            </h3>
            <h3>
              <span className="font-semibold">Teaching Style :</span> Adding
              Soon
            </h3>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center mr-4 gap-2 mt-12">
          <button className="bg-[#00ADB5] transition-all hover:bg-opacity-80 lg:px-12 px-8 py-2 rounded-xl text-white cursor-pointer">
            Hire
          </button>
          <a
            href={`https://wa.me/${data.personalInformation.phoneNumber}`}
            target="_blank"
            className="bg-green-600 transition-all hover:bg-opacity-80 lg:px-5 px-3 py-2 rounded-xl text-white cursor-pointer flex gap-1 items-center"
          >
            <img
              className="w-[25px]"
              src="https://i.ibb.co.com/WqQZmpX/Whats-App-svg.webp"
              alt=""
            />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeachersDetails;
