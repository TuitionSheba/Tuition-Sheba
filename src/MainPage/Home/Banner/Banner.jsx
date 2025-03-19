import { Link } from "react-router-dom";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="text-center max-w-screen-xl mx-auto mt-16">
      <div className="container">
        <h1>Find the perfect tutor or tuition services</h1>
        <p className="lead mb-4">
          Connect with expert tutors tailored to your educational needs
        </p>
        <div>
          <Link to={"/Available-Tuitions"} className="btn me-3 mb-3">
            Available Tuitions
          </Link>
          <a>
            <button className="btn btn-outline-light mb-3 mb-sm-0">
              Find Tutor
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
