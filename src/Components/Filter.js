import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productsActions";

export const Filter = ({ count, sort }) => {
  const dispatch = useDispatch();
  const { items, filteredItems } = useSelector((state) => state.products);
  return (
    <div className="filter">
      {/* <div className="filter-result">{count} Products</div> */}
      <div className="filter-result">{filteredItems.length} Products</div>
      <div className="filter-sort">
        Order
        {/* <select onChange={(e) => sortProducts(e.target.value)}> */}
        <select
          onChange={(e) =>
            dispatch(sortProducts(filteredItems, e.target.value))
          }
        >
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select
          //value={this.props.size}
          onChange={(e) => dispatch(filterProducts(items, e.target.value))}
        >
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};
