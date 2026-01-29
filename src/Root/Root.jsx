import { Outlet, Link } from "react-router";
import styles from "./Root.module.css";

const Root = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="cart">Cart</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Root;
