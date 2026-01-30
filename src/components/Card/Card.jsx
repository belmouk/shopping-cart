import styles from "./Card.module.css";

const Card = ({ product, onChange, onAddClick, onRemoveClick }) => {
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
      <h3>
        {product.title} {product.id}
      </h3>
      <div className={styles.productInfo}>
        <label>
          <input
            name="quantity"
            type="number"
            min={1}
            max={100}
            value={product.quantity}
            onChange={handleInputChange}
          />
        </label>
        <span>{product.price}</span>
      </div>

      <div className={styles.cardActions}>
        <button type="button" onClick={handleAddClick}>
          Add
        </button>
        <button type="button" onClick={handleRemoveClick}>
          Discard
        </button>
      </div>
    </article>
  );
};

export default Card;
