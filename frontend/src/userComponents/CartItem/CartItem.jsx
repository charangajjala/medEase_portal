import PropTypes from "prop-types";
import "./CartItem.scss";
import { Button } from "../../components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import endpoints from "../../constants/endpoints";
import { useContext, useReducer } from "react";
import useAnimatedNumber from "../../hooks/useAnimatedNumber";
import AuthContext from "../../context/AuthProvider";
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

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const axiosPrivate = useAxiosPrivate();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    quantity: item.quantity,
  });
  const { auth } = useContext(AuthContext);
  const image = generateS3ImageUrl(item.imageKey);

  // const isAuthenticated = () => {
  //   const auth = JSON.parse(localStorage.getItem("auth"));
  //   return auth && auth.accessToken;
  // };

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

  const totalValue = item.cartProduct.costPerMonth * item.quantity;
  const animatedTotalValue = useAnimatedNumber(totalValue);

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

  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img src={image} alt={item.cartProduct.productTitle} />
      </div>
      <div className="cart-item__details">
        <h3 className="title">{item.cartProduct.productTitle}</h3>
        <p className="meta">Company Name</p>
        <p className="meta">In stock</p>
        <p className="price">${item.cartProduct.costPerMonth}</p>
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
          <Button
            className="remove-button"
            name="Remove"
            onClick={(e) => handleRemove(e)}
          />
          <Button className="save-button" name="Save for later" />
        </div>
      </div>
      <div className="cart-item__price-container">
        <p className="sale-price">${animatedTotalValue}</p>
        {/* <p className="original-price">${item.cartProduct.costPerMonth}</p> */}
        {/* <p className="discount-tag">20% off</p> */}
      </div>
    </div>
  );
};

CartItem.propTypes = {
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

export default CartItem;
