import { useOutletContext } from "react-router-dom";
import Card from "../components/Card/Card";
import styles from "./Cart.module.css";
import shopStyle from "../components/Card/CardCart.module.css";

const Cart = () => {
  const [products, handleChange, handleAddClick, handleRemoveClick] =
    useOutletContext();
  const productsToBuy = products.filter((product) => product.isAdded === true);
  const totalToPay = productsToBuy.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0,
  );

  return (
    <section className={styles.content}>
      <h1>Cart</h1>

      {productsToBuy.map((product) => {
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

      <div className={styles.total}>Total: {`$${totalToPay.toFixed(2)}`}</div>
    </section>
  );
};

export default Cart;
