import { Outlet, Link } from "react-router";
import styles from "./Root.module.css";
import { useEffect, useState } from "react";

const Root = () => {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://fakestoreapi.com/products", { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("network Error");
        }
        return response.json();
      })
      .then((res) => {
        const newProducts = res.map((product) => ({
          ...product,
          quantity: 1,
          isAdded: false,
        }));
        setProducts(newProducts);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("abort error");
        } else {
          console.log(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="cart">
              Cart {products.filter((product) => product.isAdded).length}
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet
          context={[products, handleChange, handleAddClick, handleRemoveClick]}
        />
      </main>
    </>
  );
};

export default Root;
