import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router-dom";
import shopStyle from "../components/Card/CardShop.module.css";

const Shop = () => {
  const [products, handleChange, handleAddClick, handleRemoveClick] =
    useOutletContext();

  return (
    <section className={styles.productSection}>
      {products.map((product) => {
        return (
          <Card
            key={product.id}
            product={product}
            onChange={handleChange}
            onAddClick={handleAddClick}
            onRemoveClick={handleRemoveClick}
            styles={shopStyle}
          />
        );
      })}
    </section>
  );
};

export default Shop;
