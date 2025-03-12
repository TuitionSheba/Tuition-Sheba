import Header from "../../Components/Header";
import AboutUs from "./About us/AboutUs";
import AppliedTutor from "./Applied Tutor/AppliedTutor";
import AvailableTuitions from "./Available Tuitions/AvailableTuitions";
import Banner from "./Banner/Banner";
import "./Banner/Banner.css";
import Feedback from "./Feedback/Feedback";
import PaymentSection from "./Payment Section/PaymentSection";

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <Banner />
      </div>
      <div className="max-w-screen-xl mx-auto">
        <AppliedTutor />
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
