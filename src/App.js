import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { Cart } from "./Components/Cart";
import { Filter } from "./Components/Filter";
import { Products } from "./Components/Products";
import data from "./data.json";
import store from "./store/store";

function App() {
  const initialState = {
    products: data.products,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    sort: "",
    size: "",
  };
  const [productsData, setProductsData] = useState(initialState);

  const filterProducts = (value) => {
    if (value === "") {
      setProductsData({
        ...productsData,
        size: value,
        products: data.products,
      });
    } else {
      setProductsData({
        ...productsData,
        size: value,
        products: data.products.filter(
          (x) => x.availableSizes.indexOf(value) >= 0
        ),
      });
    }
  };
  const sortProducts = (value) => {
    setProductsData({
      sort: value,
      ...productsData,
      products: productsData.products
        .slice()
        .sort((a, b) =>
          value === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : value === "highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    });
  };

  const addToCart = (product) => {
    //const cartItems = productsData.cartItems.slice();
    const cartItems = [...productsData.cartItems];
    let alreadyInCart = false;
    cartItems.forEach((x) => {
      if (x._id === product._id) {
        x.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setProductsData((productsData) => ({ ...productsData, cartItems }));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeFromCart = (product) => {
    const newCartItems = [...productsData.cartItems].filter(
      (x) => x._id !== product._id
    );
    setProductsData((productsData) => ({
      ...productsData,
      cartItems: newCartItems,
    }));
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };
  const createOrder = (order) => {
    alert(`need to implement the order for ${order.name}`);
  };

  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={productsData.products.length}
                sort={productsData.sort}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
              />
              <Products
                addToCart={addToCart}
                products={productsData.products}
              />
            </div>
            <div className="sidebar">
              <Cart
                removeFromCart={removeFromCart}
                cartItems={productsData.cartItems}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    </Provider>
  );
}

export default App;
