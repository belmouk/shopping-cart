import styles from "./Card.module.css";

const Card = ({ title, imageUrl, description, price }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <span>{title}</span>
        <span>{price}</span>
      </div>
      <p className={styles.productDescription}>{description}</p>
      <div className={styles.cardActions}>
        <label htmlFor="quantity">
          <input
            name="quantity"
            id="quantity"
            type="number"
            min={0}
            value={0}
          />
        </label>
        <button type="button">Add to cart</button>
      </div>
    </article>
  );
};

export default Card;
