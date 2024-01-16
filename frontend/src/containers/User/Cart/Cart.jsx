import "./Cart.scss";
import { Header, Footer, CartItem } from "../../../userComponents";
import cartItems from "../../../constants/cartItems";
import { Button } from "../../../components";

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__header">
        <Header />
      </div>

      <main className="cart__main">
        <div className="cart__content-left">
          <div className="cart__content-left__header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="cart__content-left__items">
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="cart__content-right">
          <div className="cart__content-right__summary">
            <h2>Summary</h2>
            <div className="cart__content-right__summary__subtotal">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>$ 100</span>
            </div>
            <div className="cart__content-right__summary__discount">
              <span>Discount offered</span>
              <p>- $ 20</p>
            </div>
            <div className="cart__content-right__summary__total">
              <span>Total ({cartItems.length} items)</span>
              <span>$ 80</span>
            </div>
            <div className="cart__content-right__summary__checkout">
              <Button name="Checkout" />
              <Button name="Continue Shopping" />
            </div>
          </div>
          <div className="cart__content-right__others">
          </div>
        </div>
      </main>
      <div className="cart__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
