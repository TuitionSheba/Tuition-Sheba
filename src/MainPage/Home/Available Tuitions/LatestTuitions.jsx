import CardSkeleton from "../../../Components/CardSkeleton";
import Header from "../../../Components/Header";
import TuitionCard from "../../../Components/Table";
import useGetTuitions from "../../../Hook/useGetTuitions";

const LatestTuitions = () => {
  const [data, isPending] = useGetTuitions({
    code: "all",
    gender: "all",
    district: "all",
    topThree: true,
  });

  return (
    <div>
      <Header text="Latest Tutor Applications" />
      {isPending ? (
        <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="my-8 grid xl:grid-cols-[410px_410px_410px] md:grid-cols-[380px_380px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
          {data?.map((x, idx) => (
            <TuitionCard key={idx} data={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestTuitions;
