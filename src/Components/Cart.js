import React, { useState } from "react";
import formatCurrency from "../util";
import { Fade } from "react-reveal";
import { Zoom } from "react-reveal";
import Modal from "react-modal/lib/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderAction";

export const Cart = () => {
  // const [order, setOrder] = useState();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { order } = useSelector((state) => state.order);
  console.log(order);

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
  const createMyOrder = (e) => {
    e.preventDefault();
    const { email, address, name } = formValue;
    const order = {
      name,
      email,
      address,
      cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };

    dispatch(createOrder(order));
    // setOrder(order);
  };

  const closeModal = () => {
    console.log("closing");
    dispatch(clearOrder());
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
      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="order-detail">
              <h3 className="success-message">Your order has been placed</h3>
              <h2>{`Order ${order._id}`}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>{`${x.count} x ${x.price} `}</div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )}
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
                        onClick={() => dispatch(removeFromCart(x))}
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
                  <form onSubmit={createMyOrder}>
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
