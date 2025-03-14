import Select from "react-select";
import Header from "../../../Components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageNumbers from "./PageNumbers";
import TuitionCard from "./Tuition data/Table";
import useGetTuitions from "../../../Hook/useGetTuitions";

const option = [
  { value: "all", label: "All" },
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
];

const AvailableTuitions = () => {
  const { register, handleSubmit, reset } = useForm();
  const [gender, setGender] = useState("");
  const [data, isPending] = useGetTuitions("all");
  if (isPending) {
    return;
  }

  const handleChange = (polo) => {
    setGender(polo);
  };

  const onSubmit = (data) => {
    console.log({
      location: data?.location || "all",
      code: data?.code || "all",
      gender:
        gender.value === "" || gender.value === undefined
          ? "all"
          : gender.value,
    });
  };

  const handleReset = () => {
    reset();
    setGender("");
  };

  return (
    <div>
      <Header text="Available Tuitions" />
      <form onChange={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center justify-center my-8 flex-wrap">
          <div>
            <label className="text-lg font-medium">Filter by Gender :</label>
            <div className="w-[300px] cursor-pointer mt-1">
              <Select options={option} value={gender} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="text-lg font-medium">
              Search by tuition code :
            </label>
            <div className="w-[300px] cursor-pointer mt-1">
              <input
                {...register("code")}
                type="text"
                placeholder="Code"
                className="input input-bordered w-full max-w-xs h-[38px]"
              />
            </div>
          </div>
          <div>
            <label className="text-lg font-medium">Search by Location :</label>
            <div className="w-[300px] cursor-pointer mt-1">
              <input
                {...register("location")}
                type="text"
                placeholder="Location"
                className="input input-bordered w-full max-w-xs h-[38px]"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#00ADB5] hover:bg-opacity-80 text-white text-lg font-medium px-4 py-1 mt-[30px] rounded-md transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </form>
      <PageNumbers />
      <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
        {data?.map((x, idx) => (
          <TuitionCard key={idx} data={x} />
        ))}
      </div>
      <div className="join flex justify-center">
        <button className="join-item btn btn-lg">1</button>
        <button className="join-item btn btn-lg btn-active">2</button>
        <button className="join-item btn btn-lg">3</button>
        <button className="join-item btn btn-lg">4</button>
      </div>
    </div>
  );
};

export default AvailableTuitions;
