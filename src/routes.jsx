import Root from "./Root/Root.jsx";
import Home from "./Home/Home.jsx";
import Shop from "./Shop/Shop.jsx";
import Cart from "./Cart/Cart.jsx";
import NotFound from "./NotFound/NotFound.jsx";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
