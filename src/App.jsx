import { Outlet, Link } from "react-router";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const handleChange = (id, value) => {
    const quantity = Math.min(100, Number(value));
    setProducts((products) => {
      return products.map((item) => {
        return item.id === id ? { ...item, quantity } : item;
      });
    });
  };

  const handleAddClick = (id) => {
    setProducts((products) => {
      return products.map((item) => {
        return item.id === id ? { ...item, isAdded: true } : item;
      });
    });
  };

  const handleRemoveClick = (id) => {
    setProducts((products) => {
      return products.map((item) => {
        return item.id === id ? { ...item, isAdded: false } : item;
      });
    });
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
}

export default App;
