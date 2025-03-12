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
          <a href="tuitions.html">
            <button className="btn me-3 mb-3">Available Tuitions</button>
          </a>
          <a href="https://wa.me/+88001891644064?text=আমার%20টিচার%20লাগবে">
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
