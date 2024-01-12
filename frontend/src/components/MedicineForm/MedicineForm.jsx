import SelectField from "../SelectField/SelectField.jsx";
import Textarea from "../Textarea/Textarea.jsx";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import FormInput from "../FormInput/FormInput.jsx";
// import { companyNames } from "../../constants/companyNames.js";
import "./MedicineForm.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../constants/endpoints.js";
import { useState } from "react";

const initialState = {
  productType: "",
  productCode: "",
  productTitle: "",
  totalStock: "",
  companyName: "",
  costPerMonth: "",
  expiryDate: "",
  manufactureDate: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_PRODUCT_CODE":
      return { ...state, productCode: action.payload };
    case "SET_PRODUCT_TITLE":
      return { ...state, productTitle: action.payload };
    case "SET_TOTAL_STOCK":
      return { ...state, totalStock: action.payload };
    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
    case "SET_COST_PER_MONTH":
      return { ...state, costPerMonth: action.payload };
    case "SET_EXPIRY_DATE":
      return { ...state, expiryDate: action.payload };
    case "SET_MANUFACTURE_DATE":
      return { ...state, manufactureDate: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const MedicineForm = ({ button_name, productData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosPrivate = useAxiosPrivate();

  const [productTypes, setProductTypes] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [formIsValid, setFormIsValid] = useState(true);
  const [dateError, setDateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  useEffect(() => {
    if (productData) {
      if (productTypes.length && productData.productType) {
        const productType = productTypes.find(
          (object) => object.label === productData.productType
        );
        if (productType) {
          dispatch({
            type: "SET_PRODUCT_TYPE",
            payload: productType.value,
          });
        }
      }

      dispatch({
        type: "SET_PRODUCT_CODE",
        payload: productData.productCode || "",
      });
      dispatch({
        type: "SET_PRODUCT_TITLE",
        payload: productData.productTitle || "",
      });
      dispatch({
        type: "SET_TOTAL_STOCK",
        payload: productData.totalStock || "",
      });

      if (companyNames.length && productData.companyName) {
        const companyName = companyNames.find(
          (object) => object.label === productData.companyName
        );
        if (companyName) {
          dispatch({
            type: "SET_COMPANY_NAME",
            payload: companyName.value,
          });
        }
      }

      dispatch({
        type: "SET_COST_PER_MONTH",
        payload: productData.costPerMonth || "",
      });
      dispatch({
        type: "SET_EXPIRY_DATE",
        payload: productData.expiryDate || "",
      });
      dispatch({
        type: "SET_MANUFACTURE_DATE",
        payload: productData.manufactureDate || "",
      });
      dispatch({
        type: "SET_DESCRIPTION",
        payload: productData.description || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProductTypes = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CATERGORY_URL, {
          signal,
        });
        const formatProductTypes = response.data.map((item) => ({
          value: item.id.toString(),
          label: item.categoryName,
        }));
        if (response.status === 200) {
          setProductTypes(formatProductTypes);
        }
      } catch (error) {
        if (error.name == "CanceledError") {
          console.log("Request cancelled");
        }
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.COMPANY_REPORTS_URL, {
          signal,
        });
        const formatCompanies = response.data.map((item) => ({
          value: item.id.toString(),
          label: item.companyName,
        }));
        if (response.status === 200) {
          setFormIsValid(false);
          setCompanyNames(formatCompanies);
        }
      } catch (error) {
        if (error.name == "CanceledError") {
          console.log("Request cancelled");
        }
      }
    };

    fetchCompanies();
    fetchProductTypes();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (button_name === "Submit") {
      try {
        const productAddStatus = await axiosPrivate.post(
          endpoints.ADD_MEDICINE_URL,
          state
        );
        if (productAddStatus.status === 201) {
          setFormIsValid(false);
          setSucessMessage("Product added successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (button_name === "Update") {
      console.log("Update");
    }
  };

  useEffect(() => {
    if (state.manufactureDate && state.expiryDate) {
      if (state.expiryDate < state.manufactureDate) {
        setErrorMessage("Expiry date cannot be less than manufacture date");
        setDateError(true);
        setFormIsValid(false);
      } else {
        setErrorMessage("");
        setDateError(false);
        setFormIsValid(true);
      }
    }

    if (state.manufactureDate === "") {
      setErrorMessage("Manufacture date cannot be empty");
      setDateError(true);
      setFormIsValid(false);
    }
  }, [state.manufactureDate, state.expiryDate]);

  return (
    <form className="form">
      <SelectField
        label="Select Product Type"
        id="product-type"
        name="product-type"
        disabled={button_name === "Update" ? true : false}
        options={productTypes}
        value={
          productTypes.find((object) => {
            return object.value === state.productType;
          })?.value
        }
        onChange={(e) => {
          const selectedOption = productTypes.find((object) => {
            return object.value === e.target.value;
          });
          console.log(selectedOption);
          dispatch({
            type: "SET_PRODUCT_TYPE",
            payload: selectedOption?.label,
          });
        }}
        // The below code sends the value of the selected option above sends the label
        // onChange={(e) => {
        //   dispatch({
        //     type: "SET_PRODUCT_TYPE",
        //     payload: e.target.value,
        //   });
        // }}
        required={true}
      />
      <FormInput
        label="Product Code"
        type="text"
        disabled={button_name === "Update" ? true : false}
        value={state.productCode}
        id="medicine-expiry"
        name="medicine-expiry"
        autoComplete="off"
        onChange={(e) =>
          dispatch({ type: "SET_PRODUCT_CODE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Product Title"
        type="text"
        disabled={button_name === "Update" ? true : false}
        value={state.productTitle}
        id="product-title"
        autoComplete="off"
        name="product-title"
        onChange={(e) =>
          dispatch({ type: "SET_PRODUCT_TITLE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Total Stock"
        type="text"
        disabled={button_name === "Update" ? true : false}
        value={String(state.totalStock)}
        id="total-stock"
        name="total-stock"
        onChange={(e) =>
          dispatch({ type: "SET_TOTAL_STOCK", payload: e.target.value })
        }
        required={true}
      />
      <SelectField
        label="Select Company Name"
        id="company-name"
        disabled={button_name === "Update" ? true : false}
        value={
          companyNames.find((object) => {
            return object.value === state.companyName;
          })?.value
        }
        name="company-name"
        options={companyNames}
        onChange={(e) => {
          const selectedOption = companyNames.find((object) => {
            return object.value === e.target.value;
          });
          dispatch({
            type: "SET_COMPANY_NAME",
            payload: selectedOption?.label,
          });
        }}
        // The below code sends the value of the selected option above sends the label
        // onChange={(e) => {
        //   dispatch({
        //     type: "SET_COMPANY_NAME",
        //     payload: e.target.value,
        //   });
        // }}
        required={true}
      />
      <FormInput
        label="Cost Per Month"
        type="number"
        disabled={button_name === "Update" ? true : false}
        value={String(state.costPerMonth)}
        id="cost-per-month"
        name="cost-per-month"
        onChange={(e) =>
          dispatch({ type: "SET_COST_PER_MONTH", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Manufacture Date"
        type="date"
        disabled={button_name === "Update" ? true : false}
        value={state.manufactureDate}
        id="manufacture-date"
        name="manufacture-date"
        onChange={(e) => {
          dispatch({ type: "SET_MANUFACTURE_DATE", payload: e.target.value });
        }}
        required={true}
      />
      <FormInput
        label="Expiry Date"
        type="date"
        disabled={button_name === "Update" ? true : false}
        value={state.expiryDate}
        id="expiry-date"
        name="expiry-date"
        onChange={(e) => {
          dispatch({ type: "SET_EXPIRY_DATE", payload: e.target.value });
        }}
        required={true}
        error={dateError ? errorMessage : ""}
      />
      <div className="full-width">
        <Textarea
          label="Description"
          disabled={button_name === "Update" ? true : false}
          value={state.description}
          id="medicine-description"
          name="medicine-description"
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          required={true}
        />
      </div>
      {formIsValid && button_name !== "Update" && (
        <div className="form-button" onClick={handleFormSubmit}>
          <button type="submit">{button_name}</button>
        </div>
      )}
      {sucessMessage && button_name !== "Update" && (
        <>
          <div className="form-success-message">
            <p>{sucessMessage}</p>
          </div>
          <div className="form-reset">
            <button
              onClick={() => {
                dispatch({
                  type: "RESET_FORM",
                });
                setSucessMessage("");
              }}
            >
              Add Another Product
            </button>
          </div>
        </>
      )}
    </form>
  );
};

MedicineForm.propTypes = {
  button_name: PropTypes.string,
  productData: PropTypes.object,
};

export default MedicineForm;
