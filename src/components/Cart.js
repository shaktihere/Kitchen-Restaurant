import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItems from "./CartItems";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.items);
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="m-4 p-4 w-1/2 text-center m-auto">
      <h1 className="font-bold text-3xl mb-5">Cart ({cart.length} items)</h1>
      <div className="text-left">
        {cart.map((item) => {
          return (
            <div className="py-4">
              <CartItems data={item} />
            </div>
          );
        })}
      </div>
      {cart.length === 0 && <h1 className="my-4">Oops, the cart is empty</h1>}
      <button
        className="font-bold bg-red-500 text-lg  px-2 py-1 rounded-md"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
