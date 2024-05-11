import React from "react";
import { useSelector } from "react-redux";

const Bill = () => {
  let total = 0;
  let cart = useSelector((store) => store.cart.items);
  cart.map((item) => {
    total +=
      item.card.info.count *
      (item.card.info.price / 100 || item.card.info.defaultPrice / 100);
  });
  let deliveryFee = 0;
  if (total < 500) {
    deliveryFee = 60;
  }
  return (
    <div className="ml-10 text-left">
      <ul className="">
        <li className="font-bold text-3xl mb-5">Bill</li>
        <div className="bg-gray-100 p-4 rounded-md">
          <li className="">
            <span className="font-bold">Cart total = </span>₹{" "}
            {Math.round(total)}
          </li>
          <li className="">
            <span className="font-bold">GST @18% =</span> ₹{" "}
            {Math.round(total * 0.18)}
          </li>
          <li className="">
            <span className="font-bold">Delivery fee = </span>
            {deliveryFee != 0 ? "₹ " + deliveryFee : "FREE"}
          </li>
          <li className="">
            {deliveryFee != 0
              ? "Add item worth ₹ " + (500 - total) + " for FREE delivery"
              : null}
          </li>
          <li className="">
            <span className="font-bold">Total amount payable =</span> ₹{" "}
            {Math.round(total + Math.round(total * 0.18) + deliveryFee)}
          </li>
        </div>
        <li>
          <button className="p-2 ml-12 bg-green-300 mt-5 rounded-lg shadow-md font-semibold">
            Proceed to Payment
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Bill;
