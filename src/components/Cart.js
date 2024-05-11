import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItems from "./CartItems";
import Bill from "./Bill";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.items);
  let len = 0;
  cart.map((item) => (len += item.card.info.count));
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="p-4 justify-center m-auto flex">
      <div className="text-center">
        <h1 className="font-bold text-3xl mb-5">
          Cart ({len} {len > 1 ? "Items" : "Item"})
        </h1>
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
      <div className="">{cart.length !== 0 && <Bill />}</div>
    </div>
  );
};

export default Cart;
