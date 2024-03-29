import "./CheckoutItem.scss";
import PropTypes from "prop-types";
import { Button } from "../../components";
import { useContext, useReducer } from "react";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import endpoints from "../../constants/endpoints";
import generateS3ImageUrl from "../../utils/s3Utils";

const initialState = {
  quantity: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    default:
      throw new Error();
  }
}

const CheckoutItem = ({ item, onQuantityChange, onRemove }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    quantity: item.quantity,
  });
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const image = generateS3ImageUrl(item.imageKey);

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      if (auth?.accessToken) {
        const response = await axiosPrivate.put(
          endpoints.UPDATE_CART_ITEM_URL.replace("{id}", item.id)
        );
        console.log(response);
        onRemove(item.id);
      }
    } catch (err) {
      console.log("Error in handleRemove:", err);
    }
  };

  const handleQuantityChange = async (e) => {
    const newQuantity = Number(e.target.value);
    dispatch({ type: "SET_QUANTITY", payload: newQuantity });
    console.log(item);
    try {
      if (auth?.accessToken) {
        const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
          medicineId: item.cartProduct.id,
          quantity: newQuantity,
          costPerMonth: item.cartProduct.costPerMonth,
        });
        const data = response.data;
        console.log(data);
        onQuantityChange(item.id, newQuantity);
      }
    } catch (err) {
      console.log("Error in handleQuantityChange:", err);
    }
  };

  return (
    <div className="checkout-item">
      <div className="checkout-item__image">
        <img src={image} alt="Product Image" />
      </div>
      <div className="checkout-item__details">
        <div className="checkout-item__details-left">
          <h3 className="title">{item.cartProduct.productTitle}</h3>
          <p className="meta">In stock</p>
          <div className="quantity-container">
            <div className="quantity-div">
              <p className="quantity-label">Qty</p>
              <select
                className="quantity-selector"
                onChange={(e) => handleQuantityChange(e)}
                value={state.quantity}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="checkout-item__details-right">
          <p className="original-price">${item.cartProduct.costPerMonth}</p>
          <Button
            className="remove-button"
            name="Remove"
            onClick={(e) => handleRemove(e)}
          />
        </div>
      </div>
    </div>
  );
};

CheckoutItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cartProduct: PropTypes.shape({
      id: PropTypes.number.isRequired,
      productTitle: PropTypes.string.isRequired,
      costPerMonth: PropTypes.number.isRequired,
      totalStock: PropTypes.number.isRequired,
    }).isRequired,
    imageKey: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default CheckoutItem;
