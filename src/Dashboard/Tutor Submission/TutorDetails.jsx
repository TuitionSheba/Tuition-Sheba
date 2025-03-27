import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const TutorDetails = () => {
  const params = useParams();
  const axios = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: [params, "tutor-application"],
    queryFn: async () => {
      const res = await axios.get(`/tutor-submissions/${params.requirementId}`);
      return res.data;
    },
  });

  return (
    <div>
      {isPending ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="my-8 grid xl:grid-cols-[384px_384px_384px] md:grid-cols-[330px_330px] grid-cols-[350px] xl:gap-8 gap-4 justify-center">
          {data.map((x, idx) => (
            <div key={idx} className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  className="md:w-[384px] md:h-[225px]"
                  src={x.personalInformation.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{x.personalInformation.name}</h2>
                Gender: {x.personalInformation.gender}
                <div className="card-actions justify-end">
                  <Link
                    to={`/dashboard/Tutor-Submissions/Tutors/${params.requirementId}/${x._id}`}
                    className="btn "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorDetails;
