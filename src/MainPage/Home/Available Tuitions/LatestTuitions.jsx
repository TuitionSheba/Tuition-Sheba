import Header from "../../../Components/Header";
import TuitionCard from "./Tuition data/Table";
import useGetTuitions from "../../../Hook/useGetTuitions";

const LatestTuitions = () => {
  const [data, isPending] = useGetTuitions({
    code: "all",
    gender: "all",
    district: "all",
    topThree: true,
  });

  if (isPending) {
    return (
      <div className="flex justify-center mt-[25%]">
        <span className="loading loading-spinner loading-lg flex"></span>
      </div>
    );
  }

  return (
    <div>
      <Header text="Latest Tutor Applications" />
      <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
        {data?.map((x, idx) => (
          <TuitionCard key={idx} data={x} />
        ))}
      </div>
    </div>
  );
};

export default LatestTuitions;
