import { Link } from "react-router-dom";

const TutorApplication = () => {
  return (
    <div className="bg-[#f3f3f3] w-full h-[200px] text-[#00ADB5] rounded flex flex-col items-center justify-center gap-8 mt-20">
      <h1 className="lg:p-0 px-5">
        Want to become a tutor ? Click the button below to submit your
        application
      </h1>
      <Link
        to={"/Teacher-Application"}
        className="bg-[#00ADB5] px-4 py-3 rounded-[34px] hover:bg-opacity-80 text-white transition-all"
      >
        Check your applied status
      </Link>
    </div>
  );
};

export default TutorApplication;
