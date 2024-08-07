import { FaBars, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import "./ToggleButton.scss";

const ToggleButton = (props) => {
  return (
    <button
      onClick={props.toggleSidebar}
      className="admin-dashboard__toggle-btn "
    >
      <p>{props.isSidebarVisible ? <FaTimes /> : <FaBars />}</p>
    </button>
  );
};

ToggleButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default ToggleButton;
