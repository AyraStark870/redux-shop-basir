import React, { useEffect, useState } from "react";
import formatCurrency from "../util";
import { Zoom } from "react-reveal";
import Modal from "react-modal/lib/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productsActions";
import { addToCart } from "../actions/cartActions";

export const Products = ({ products }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const { items, filteredItems } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);

  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct(null);
  };

  return (
    <div>
      {/* <Fade bottom cascade={true}> */}
      {!items ? (
        <div>Loading....</div>
      ) : (
        <ul className="products">
          {filteredItems.map((x) => (
            <li key={x._id}>
              <div className="product">
                <a href={`# ${x._id}`} onClick={() => openModal(x)}>
                  <img src={x.image} alt={x.title} />
                  <p>{x.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(x.price)}</div>
                  <button
                    onClick={() => dispatch(addToCart(x))}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* </Fade> */}
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button onClick={closeModal} className="close-modal">
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                    className="button primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};
