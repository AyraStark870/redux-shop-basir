import React, { useState } from "react";
import formatCurrency from "../util";
import { Fade } from "react-reveal";

export const Cart = (props) => {
  const { cartItems, removeFromCart } = props;
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleInput = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };
  const createOrder = (e) => {
    e.preventDefault();
    const { email, address, name } = formValue;
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    props.createOrder(order);
  };

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            {`you have ${cartItems.length} in the cart`}
          </div>
        )}
      </div>
      <div>
        <div className="cart">
          <Fade left cascade={true}>
            <ul className="cart-items">
              {cartItems.map((x) => (
                <li key={x._id}>
                  <div>
                    <img src={x.image} alt={x.title} />
                  </div>
                  <div>
                    <div> {x.title} </div>
                    <div className="right">
                      {formatCurrency(x.price)}x{x.count}{" "}
                      <button
                        className="button"
                        onClick={() => removeFromCart(x)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => setShowCheckOut(true)}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckOut && (
              <Fade right cascade={true}>
                <div className="cart">
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                          value={formValue.email}
                        />
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                          value={formValue.name}
                        />
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                          value={formValue.address}
                        />
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </>
  );
};
