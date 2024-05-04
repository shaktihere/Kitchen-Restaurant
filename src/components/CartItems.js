import React from "react";
import REST_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const CartItems = ({ data }) => {
  const dispatch = useDispatch();
  const addItems = (item) => {
    dispatch(addItem(item));
  };
  if (data.card) {
    return (
      <div className="border-b-2">
        <ul className="flex justify-between px-5">
          <li className="font-mono font-bold text-xl w-7/12">
            {data.card.info.name}
          </li>
          <li className="font-bold text-lg w-2/12">
            ₹ {data.card.info.price / 100 || data.card.info.defaultPrice / 100}
          </li>

          <div className="relative">
            <h1 className="bg-yellow-400 mr-24 pl-1 pr-3 rounded-r-full absolute">
              100
            </h1>
            <img
              src={REST_URL + data.card.info.imageId}
              alt="cart item"
              className="h-28 w-36 rounded-lg mb-4"
            />
            <div className="absolute flex top-24 left-12 bg-black text-white rounded-l-lg rounded-r-lg ">
              <li>
                <button className="rounded-l-lg font-bold px-3 hover:bg-white hover:text-black">
                  -
                </button>
              </li>
              <li>
                <button
                  className="px-2 rounded-r-lg font-bold px-2 hover:bg-white hover:text-black"
                  onClick={() => addItems(data)}
                >
                  +
                </button>
              </li>
            </div>
          </div>
        </ul>
      </div>
    );
  }
};

export default CartItems;
