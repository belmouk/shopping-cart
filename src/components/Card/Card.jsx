import cartStyle from "./CardCart.module.css";
import shopStyle from "./CardShop.module.css";

const Card = ({ product, onChange, onAddClick, onRemoveClick, styles }) => {
  const handleInputChange = (e) => {
    onChange(product.id, e.target.value);
  };
  const handleAddClick = () => {
    onAddClick(product.id);
  };
  const handleRemoveClick = () => {
    onRemoveClick(product.id);
  };

  return (
    <article className={`${styles.card} ${product.isAdded && styles.added}`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.productInfo}>
        <h3> {product.title} </h3>
        <div className={styles.productQuantity}>
          <label htmlFor={`quantity${product.id}`}> Quantity:</label>
          <input
            name="quantity"
            id={`quantity${product.id}`}
            type="number"
            min={1}
            max={100}
            value={product.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.cardActions}>
          <span
            className={styles.productPrice}
          >{`$${product.price.toFixed(2)}`}</span>
          <button
            type="button"
            onClick={product.isAdded ? handleRemoveClick : handleAddClick}
          >
            {product.isAdded ? "Discard" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
