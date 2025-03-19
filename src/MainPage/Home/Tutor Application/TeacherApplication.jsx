import { useContext, useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import "./removeInputIncrement.css";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../Auth Provider/AuthContext";
import useGetLocation from "../../../Hook/useGetLocation";
import useShowPopup from "../../../Hook/useShowPopup";

export default function TeacherApplicationForm() {
  const axios = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const showPopup = useShowPopup();

  const [section, setSection] = useState(1);
  const [image, setImage] = useState("");
  const [upazillaId, setUpazillaId] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ boo: false, page: 1, message: "" });

  const [districtData, upazillaData] = useGetLocation(upazillaId);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      education: [{ degree: "", year: "", board: "", institute: "", gpa: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };

  const isEducationValid = (educationEntry) => {
    return (
      educationEntry.degree &&
      educationEntry.year &&
      educationEntry.board &&
      educationEntry.institute &&
      educationEntry.score
    );
  };

  const onSubmit = (data) => {
    showPopup();
    const num = data.number.split("");
    if (
      data.number === "" ||
      data.district === "" ||
      data.upazilla === "" ||
      data.area === "" ||
      data.salary === "" ||
      data.birth === "" ||
      data.gender === ""
    ) {
      setError({ boo: true, page: 1, message: "Please fill out the form" });
      return setSection(1);
    } else if (image === "") {
      setError({ boo: true, page: 1, message: "Upload an Image" });
      return setSection(1);
    } else if (data.number.length !== 11 || num[0] !== "0" || num[1] !== "1") {
      setError({ boo: true, page: 1, message: "Invalid Number" });
      return setSection(1);
    } else if (!data.education.every(isEducationValid)) {
      setError({
        boo: true,
        page: 2,
        message: "Please fill all fields",
      });
      return setSection(2);
    }

    setDisabled(true);

    // Upload image to imgbb
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSING_KEY
        }`,
        { image: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const infos = {
          approval: "pending",
          personalInformation: {
            name: user.displayName,
            email: user.email,
            image: res.data.data.url,
            birthDay: data.birth,
            gender: data.gender,
            phoneNumber: data.number,
            salary: data.salary,
            location: {
              district: data.district,
              upazilla: data.upazilla,
              area: data.area,
            },
          },
          education: data.education,
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
      })
      .catch(() => setDisabled(false));
  };

  useEffect(() => {
    document.title = "Teacher Application";
    window.scroll(0, 0);
  }, []);

  return (
    <div className="py-32">
      <div className="p-6 mx-auto bg-white rounded-xl">
        <form
          onChange={() => {
            setError({ boo: false, page: section, message: "" });
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {section === 1 && (
            <div className="max-w-2xl mx-auto">
              {error.boo && (
                <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 mb-12">
                  <p>{error.message}</p>
                </div>
              )}
              <h2 className="text-lg font-bold">Personal Information</h2>
              <div className="flex gap-5">
                <div>
                  <div
                    className="bg-[#EFEFEF] w-[100px] h-[100px] rounded-full flex justify-center items-center relative cursor-pointer"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    {image === "" ? (
                      <>
                        <FaUser className="text-3xl" />
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="z-50 absolute cursor-pointer text-2xl right-2 top-2 text-black">
                            <RxCross2
                              onClick={() => {
                                setImage("");
                                if (inputRef.current) {
                                  inputRef.current.value = null;
                                }
                              }}
                            />
                          </span>
                          {image && (
                            <img
                              className="w-[100px] h-[100px] rounded-full"
                              src={URL.createObjectURL(image)}
                              alt=""
                            />
                          )}
                        </div>
                      </>
                    )}
                    <input
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mt-3 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder={user?.displayName}
                    disabled
                    className="input input-bordered md:w-[554px] w-full"
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col justify-center md:gap-3 gap-2">
                <div>
                  <label className="block mt-3 mb-2">Phone Number</label>
                  <input
                    type="number"
                    placeholder="Exp. 01717XXXXXX"
                    {...register("number")}
                    className="input input-bordered md:w-[215px] w-full"
                  />
                </div>
                <div>
                  <label className="block mt-3 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    {...register("birth")}
                    className="input input-bordered md:w-[215px] w-full"
                  />
                </div>
                <div>
                  <label className="block mt-3 mb-2">Gender</label>
                  <select
                    {...register("gender")}
                    className="md:w-[215px] w-full select select-bordered"
                  >
                    <option value="">Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

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
              <button
                onClick={() => {
                  setSection(2);
                  window.scroll(0, 0);
                }}
                className="py-3 rounded-xl bg-[#00ADB5] text-white hover:bg-opacity-80 transition-all mt-4 w-full"
              >
                Next
              </button>
            </div>
          )}
          {section === 2 && (
            <div className="py-[66px] xl:w-[1300px] md:w-[500px] mx-auto">
              {error.boo && (
                <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 mb-12">
                  <p>{error.message}</p>
                </div>
              )}
              <h2 className="text-center text-lg font-bold">
                Educational Background
              </h2>
              <div className="border p-4 rounded mt-3 space-y-3 mx-auto">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex lg:flex-row flex-col items-center justify-center gap-4"
                  >
                    <input
                      {...register(`education.${index}.degree`)}
                      type="text"
                      placeholder="Degree"
                      className="xl:w-[300px] lg:w-[150px] h-[48px] input input-bordered"
                    />
                    <input
                      {...register(`education.${index}.year`)}
                      type="number"
                      placeholder="Year"
                      className="xl:w-[300px] lg:w-[150px] h-[48px] input input-bordered"
                    />
                    <input
                      {...register(`education.${index}.board`)}
                      type="text"
                      placeholder="Board"
                      className="xl:w-[300px] lg:w-[150px] h-[48px] input input-bordered"
                    />
                    <input
                      {...register(`education.${index}.institute`)}
                      type="text"
                      placeholder="Institute"
                      className="xl:w-[300px] lg:w-[150px] h-[48px] input input-bordered"
                    />
                    <input
                      {...register(`education.${index}.score`)}
                      type="number"
                      placeholder="GPA/CGP"
                      className="xl:w-[300px] lg:w-[150px] h-[48px] input input-bordered"
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      degree: "",
                      year: "",
                      board: "",
                      institute: "",
                      score: "",
                    })
                  }
                  className={`${fields.length > 1 ? "ml-2" : "ml-10"}`}
                >
                  <CiCirclePlus />
                </button>
              </div>
              <div className="flex justify-end mr-4 gap-2 mt-4">
                <button
                  onClick={() => setSection(1)}
                  type="button"
                  className="bg-[#D84040] transition-all hover:bg-opacity-80 px-3 py-2 rounded-xl text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={disabled}
                  className="bg-[#00ADB5] transition-all hover:bg-opacity-80 px-3 py-2 rounded-xl text-white cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
