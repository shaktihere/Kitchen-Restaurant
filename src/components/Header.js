import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [login, setLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items); //subscribing to out store using Selector Hook
  return (
    <div className="flex sticky top-0 z-10 ml-1 mr-1 border bg-white rounded-b-sm mb-6 shadow-md">
      <div className=" ">
        <Link to="/">
          <img
            src="https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg"
            className="w-20 h-20 rounded-full ml-1 mt-1 mb-1"
            alt="restaurant-logo"
          />
        </Link>
      </div>
      <div className="flex items-center ml-24">
        <ul className="flex">
          <div className="flex justify-between">
            <li className="px-4  mr-12 font-sans text-lg font-bold">
              {onlineStatus ? "✅" : "❌"} Internet Working
            </li>
            <div className="flex justify-between">
              <li className="px-4 mr-8 text-lg font-bold">
                <Link to="/">🏠 Home</Link>
              </li>
              <li className="px-4 mr-8 text-lg font-bold">
                <Link to="/about">ℹ️ About Us</Link>
              </li>
              <li className="px-4 mr-8 text-lg font-bold">
                <Link to="/contact">☎️ Contact Us</Link>
              </li>
              <li className="px-4 mr-8  text-lg font-bold">
                <Link to="/grocery">🌽 Grocery</Link>
              </li>
            </div>
            <div className="flex justify-between">
              <li className="px-4 mr-12 text-lg font-bold">
                <button
                  className="login"
                  onClick={() => {
                    if (login == "Login") setLogin("Logout");
                    else setLogin("Login");
                  }}
                >
                  👤 {login}
                </button>
              </li>
              <li className="px-4 font-bold mr-12 text-lg font-bold">
                {loggedInUser}
              </li>
            </div>
            <Link to="/cart">
              <li className="px-4 text-3xl font-bold ml-4">
                🛒{cartItems.length}
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
