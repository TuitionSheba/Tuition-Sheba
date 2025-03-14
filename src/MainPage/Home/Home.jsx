import Header from "../../Components/Header";
import AboutUs from "./About us/AboutUs";
import TutorApplication from "./Tuto Application/TutorApplication";
import AvailableTuitions from "./Available Tuitions/AvailableTuitions";
import Banner from "./Banner/Banner";
import "./Banner/Banner.css";
import Feedback from "./Feedback/Feedback";
import PaymentSection from "./Payment Section/PaymentSection";
import { useEffect, useState } from "react";
import useUser from "../../Hook/useUser";

const Home = () => {
  const [data] = useUser();
  const [validity, setValidity] = useState(false);
  useEffect(() => {
    if (data && data.userRoll === "teacher") {
      setValidity(true);
    }
  }, [data]);
  return (
    <div>
      <div className="hero-section">
        <Banner />
      </div>
      <div className="max-w-screen-xl mx-auto">
        {!validity && <TutorApplication />}
        <AvailableTuitions />
        <Feedback />
      </div>
      <div className="bg-gradient-to-r from-[#EEEEEE] to-[#393E46] w-full">
        <AboutUs />
      </div>
      <div className="bg-[#F4F7F9] py-20">
        <Header p={true} text={"We Accept"} />
        <PaymentSection />
      </div>
    </div>
  );
};

export default Home;
