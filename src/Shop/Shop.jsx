import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useOutletContext();

  const handleChange = (id, value) => {
    const nextProducts = products.map((item) => {
      if (item.id === id) {
        item.quantity = value >= 100 ? 100 : value;
      }
      return item;
    });
    setProducts(nextProducts);
  };

  const handleAddClick = (id) => {
    const nextProducts = products.map((item) => {
      if (item.id === id) {
        item.isAdded = true;
      }
      return item;
    });
    setProducts(nextProducts);
  };

  const handleRemoveClick = (id) => {
    const nextProducts = products.map((item) => {
      if (item.id === id) {
        item.isAdded = false;
      }
      return item;
    });
    setProducts(nextProducts);
  };

  return (
    <>
      <p>Welcome to Shop page</p>
      <section className={styles.productSection}>
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              product={product}
              onChange={handleChange}
              onAddClick={handleAddClick}
              onRemoveClick={handleRemoveClick}
            />
          );
        })}
      </section>
    </>
  );
};

export default Shop;
