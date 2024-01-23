import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faShoppingCart,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import endpoints from "../../constants/endpoints";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import userEndpoints from "../../constants/userEndpoints";
import AuthContext from "../../context/AuthProvider";

const initialState = {
  category: "All Categories",
  searchContent: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SEARCH_CONTENT":
      return { ...state, searchContent: action.payload };
    default:
      throw new Error();
  }
}

const Navbar = ({ cartCount }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [address, setAddress] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { category, searchContent } = state;
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth?.accessToken) {
      const fetchAddresses = async () => {
        try {
          const response = await axiosPrivate.get(userEndpoints.GET_ADDRESSES);
          const data = response.data;
          console.log("The Addresses Received are", data);
          setAddress(data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAddresses();
    } else {
      setAddress("Login to view addresses");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocation = () => {
    navigate("/profile/addresses");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    queryParams.append("categoryName", category);
    queryParams.append("keyword", searchContent);

    const searchResults = async () => {
      try {
        const response = await axiosInstance.get(
          `${endpoints.GET_PRODUCTS_URL}?${queryParams.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        navigate("/search", { state: { data } });
        console.log(data);
      } catch (err) {
        console.log(err.name);
      }
    };

    searchResults();
    // navigate(`/medicine?${queryParams.toString()}`);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container__location">
        <button
          className="navbar-container__location-button"
          onClick={handleLocation}
        >
          <FontAwesomeIcon icon={faLocation} />
        </button>
        <div className="navbar-container__location-text">
          {address.addressName ? (
            <>
              <span>{address?.addressLine1}</span>
              <span>
                {address?.city}, {address?.state}, {address?.country} -{" "}
                {address?.pincode}
              </span>
            </>
          ) : (
            <span>{address}</span>
          )}
        </div>
      </div>
      <div className="navbar-container__search">
        <select
          id="categories"
          name="Categories"
          className="navbar-container__search__cat-search"
          value={category}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
        >
          <option value="All Categories">All Categories</option>
        </select>
        <input
          type="text"
          placeholder="Search here..."
          value={searchContent}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_CONTENT", payload: e.target.value })
          }
        />
        <button
          className="navbar-container__search-button"
          onClick={(e) => handleSearch(e)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="navbar-container__buttons">
        <button className="navbar-container__notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button
          className="navbar-container__cart-button"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number,
};

export default Navbar;
