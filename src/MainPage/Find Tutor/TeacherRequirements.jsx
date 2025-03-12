import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Auth Provider/AuthContext";
import "./removeInputIncrement.css";
import Select from "react-select";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useGetLocation from "../../Hook/useGetLocation";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const classOptions = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
  { value: "4", label: "Class 4" },
  { value: "5", label: "Class 5" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "HSC", label: "HSC" },
];
const timeOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "after magrib", label: "After Magrib" },
  { value: "after esha", label: "After Esha" },
];
const daysOption = [
  { value: 1, label: "1 day in a week" },
  { value: 2, label: "2 days in a week" },
  { value: 3, label: "3 days in a week" },
  { value: 4, label: "4 days in a week" },
  { value: 5, label: "5 days in a week" },
  { value: 6, label: "6 days in a week" },
  { value: 7, label: "7 days in a week" },
];
const subjectOptions = [
  { value: "Bangla", label: "Bangla" },
  { value: "English", label: "English" },
  { value: "Math", label: "Math" },
  { value: "Higher Math", label: "Higher Math" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Physics", label: "Physics" },
  { value: "Biology", label: "Biology" },
  { value: "Religion", label: "Religion" },
  { value: "", label: "" },
];

export default function TeacherRequirementsForm() {
  const axios = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [upazillaId, setUpazillaId] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    class: [],
    days: 0,
    time: [],
    group: "",
  });
  const [error, setError] = useState({ boo: false, message: "" });

  const [districtData, upazillaData] = useGetLocation(upazillaId);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (
      data.number === "" ||
      data.district === "" ||
      data.upazilla === "" ||
      data.area === "" ||
      data.salary === "" ||
      selectedOptions.class.length === 0 ||
      selectedOptions.time.length === 0 ||
      selectedOptions.days === 0
    ) {
      setError({ boo: true, message: "Please fill out the form" });
      return;
    }

    setDisabled(true);
    const infos = {
      personalInformation: {
        name: user.displayName,
        email: user.email,
        salary: data.salary,
        location: {
          district: data.district,
          upazilla: data.upazilla,
          area: data.area,
        },
      },
      preference: {
        preferredTime: selectedOptions.time,
        preferredClass: selectedOptions.class,
        availableDays: selectedOptions.days,
      },
    };

    axios
      .post("/teacher-applications", infos)
      .then((res) => {
        if (res.data.acknowledged) {
          navigate("/");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => setDisabled(false));
  };

  useEffect(() => {
    document.title = "Tutor Requirements";
  }, []);

  return (
    <div className="py-32">
      <div className="p-6 mx-auto bg-white rounded-xl">
        <form
          onChange={() => {
            setError({ boo: false, message: "" });
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-2xl mx-auto">
            {error.boo && (
              <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 mb-12">
                <p>{error.message}</p>
              </div>
            )}

            {/* ----- gender and salary ----- */}
            <div className="flex justify-center md:flex-row flex-col md:gap-3 gap-2">
              <div className="md:w-[330px] w-full">
                <label className="block mt-3 mb-2">Wanted Tutor</label>
                <select
                  {...register("gender")}
                  className="md:w-[330px] w-full select select-bordered"
                >
                  <option value="">Select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="md:w-[330px] w-full">
                <label className="block mt-3 mb-2">Salary (per month)</label>
                <input
                  type="number"
                  placeholder="taka"
                  {...register("salary")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            {/* ----- gender and salary ----- */}

            {/* ----- Location ----- */}
            <div>
              <label className="block mt-3 mb-2">Location</label>
              <div className="flex gap-2">
                <select
                  {...register("district")}
                  className="select select-bordered md:w-[330px] w-full"
                  onChange={(res) => setUpazillaId(res.target.value)}
                >
                  <option value="">Select District</option>
                  {districtData.map((x, idx) => (
                    <option key={idx} value={`${x.id}`}>
                      {x.name}
                    </option>
                  ))}
                </select>
                <select
                  {...register("upazilla")}
                  className="select select-bordered md:w-[330px] w-full"
                >
                  <option value="">Select Upazilla</option>
                  {upazillaData.map((x, idx) => (
                    <option key={idx} value={`${x.id}`}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                {...register("area")}
                placeholder="Area"
                className="input input-bordered w-full mt-2"
              />
            </div>
            {/* ----- Location ----- */}

            {/* ------ time and week ------ */}
            <div className="flex justify-center md:flex-row-reverse flex-col md:gap-3 gap-2">
              <div className="md:w-[330px] w-full h-[48px]">
                <label className="block mt-3 mb-2">Days (In a week)</label>
                <Select
                  options={daysOption}
                  value={daysOption.find(
                    (option) => option.value === selectedOptions.days
                  )}
                  onChange={(selectedOption) => {
                    setSelectedOptions((prevState) => ({
                      ...prevState,
                      days: selectedOption.value,
                    }));
                  }}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "48px",
                    }),
                  }}
                />
              </div>
              <div className="md:w-[330px] w-full">
                <label className="block mt-3 mb-2">Time</label>
                <Select
                  options={timeOptions}
                  value={selectedOptions.time}
                  onChange={(e) =>
                    setSelectedOptions((prevState) => ({
                      ...prevState,
                      time: e,
                    }))
                  }
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "48px",
                    }),
                  }}
                />
              </div>
            </div>
            {/* ------ time and week ------ */}

            {/* ----- class and group ----- */}
            <div className="flex justify-center md:flex-row flex-col md:gap-3 gap-2">
              <div className="md:w-[330px] w-full">
                <label className="block mt-3 mb-2">Class</label>
                <Select
                  options={classOptions}
                  value={selectedOptions.class}
                  onChange={(e) =>
                    setSelectedOptions((prevState) => ({
                      ...prevState,
                      class: e,
                    }))
                  }
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "48px",
                    }),
                  }}
                />
              </div>
              <div className="md:w-[330px] w-full">
                <label className="block mt-3 mb-2">Group</label>
                <Select
                  isDisabled
                  options={classOptions}
                  value={selectedOptions.class}
                  onChange={(e) =>
                    setSelectedOptions((prevState) => ({
                      ...prevState,
                      class: e,
                    }))
                  }
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "48px",
                    }),
                  }}
                />
              </div>
            </div>
            {/* ----- class and group ----- */}

            {/* ----- subject ----- */}
            <div className="mt-3">
              <Select
                isMulti
                // options={preferredClassOptions}
                // value={selectedOptions.preferredClass}
                onChange={(e) =>
                  setSelectedOptions((prevState) => ({
                    ...prevState,
                    preferredClass: e,
                  }))
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "48px",
                  }),
                }}
              />
            </div>
            {/* ----- subject ----- */}

            <button
              type="submit"
              className="py-3 rounded-xl bg-[#00ADB5] text-white hover:bg-opacity-80 transition-all mt-4 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
