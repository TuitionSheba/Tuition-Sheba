import { Link } from "react-router-dom";
import useUser from "../Hook/useUser";
import { useEffect } from "react";

const Notifications = () => {
  const [userData, userLoading] = useUser();

  useEffect(() => {
    document.title = "Notifications";
  });

  if (userLoading) {
    return (
      <div className="flex justify-center mt-[25%]">
        <span className="loading loading-spinner loading-lg flex"></span>
      </div>
    );
  }

  if (userData["notification"] === undefined && userData.pending !== true) {
    return (
      <div className="mt-[25%]">
        <span className="flex items-center justify-center text-2xl">
          No notification to show
        </span>
      </div>
    );
  }

  return (
    <div>
      {userData.pending === true && (
        <div className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4 text-center">
          Your application is under review and we will shortly notify you about
          the status of your application.
        </div>
      )}
      {userData?.notification?.map(
        (x, idx) =>
          x.reason === "denied" && (
            <div
              key={idx}
              className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4"
            >
              <div>
                <div className="flex justify-between text-xl font-bold">
                  <h1>from:{x?.name}</h1>
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
            </div>
          )
      )}
      {userData?.notification?.map(
        (x, idx) =>
          x.reason === "accepted" && (
            <div
              key={idx}
              className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4"
            >
              <div>
                <div className="flex justify-between text-xl font-bold">
                  <h1>from: {x?.name}</h1>
                  <p>{x.date}</p>
                </div>
                <p className="mt-2">
                  congratulations you&apos;re officially a part of Tuition Sheba
                  as a tutor
                </p>
              </div>
            </div>
          )
      )}
      {userData?.notification?.map(
        (x, idx) =>
          x.reason === "applied" && (
            <div
              key={idx}
              className="shadow-sm border rounded-md border-[#959697] bg-[#EEEE] w-[90%] mx-auto mt-10 p-4"
            >
              <div>
                <div className="flex justify-between text-xl font-bold">
                  <h1>from: {x?.name}</h1>
                  <p>{x.date}</p>
                </div>
                <p className="mt-2">
                  I have noticed your requirements for a tutor and i&apos;d like
                  to apply
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Notifications;
