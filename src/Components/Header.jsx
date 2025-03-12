import PropTypes from "prop-types";

const Header = ({ text, p }) => {
  return (
    <div>
      <h1
        className={`text-[#504B38] text-3xl font-medium flex justify-center ${
          !p ? "my-20" : "mb-20"
        }`}
      >
        {text}
      </h1>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  p: PropTypes.bool,
};

export default Header;
