import { Link } from "react-router-dom";
import useUser from "../Hook/useUser";

const Notifications = () => {
  const [userData, userLoading] = useUser();

  if (userLoading) {
    return;
  }

  console.log(userData);

  return (
    <div>
      {userData.pending === true && (
        <div className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4 text-center">
          Your application is under review and we will shortly notify you about
          the status of your application.
        </div>
      )}
      {userData?.notification?.map((x, idx) => (
        <div
          key={idx}
          className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4"
        >
          {x.reason === "denied" && (
            <div>
              <div className="flex justify-between text-xl font-bold">
                <h1 className="">{x?.name}</h1>
                <p>{x.date}</p>
              </div>
              <p className="mt-2">message: {x.message}</p>
              <p className="mt-6">
                <span className="text-blue-500 hover:underline cursor-pointer">
                  <Link to="/Teacher-Application">Click here</Link>
                </span>{" "}
                to resubmit the form
              </p>
            </div>
          )}
        </div>
      ))}
      {/* {userData?.message?.map((x, idx) => (
        <div
          key={idx}
          className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4 text-center"
        >
          {userData.pending === false && x}
        </div>
      ))} */}
    </div>
  );
};

export default Notifications;
