import "./Loading.scss";
import PropTypes from "prop-types";
// import loader from "../../assets/main-loader.svg";

const loader = "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/main-loader.svg";

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <img src={loader} alt="Loading" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
