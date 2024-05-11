import React, { useState } from "react";
import REST_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import AlertMessage from "./AlertMessage";
import AlertDelete from "./AlertDelete";

const CartItems = ({ data }) => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState(0);
  const [del, setDel] = useState(0);
  const addItems = (item) => {
    setMess(1);
    setDel(0);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setMess(0);
    }, 5000);
    timer;
    dispatch(addItem(item));
  };
  const deleteItems = (item) => {
    setDel(1);
    setMess(0);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setDel(0);
    }, 5000);
    timer;
    dispatch(removeItem(item));
  };
  if (data.card) {
    return (
      <div className="mb-5 border-b-2 border-gray-200">
        <ul className="flex justify-between pl-5">
          <li className="font-mono font-bold text-xl w-5/12">
            {data.card.info.name}
          </li>
          <div className="flex-col">
            <li className="text-lg">
              {data.card.info.count} X ₹{" "}
              {Math.round(
                data.card.info.price / 100 || data.card.info.defaultPrice / 100
              )}{" "}
            </li>
            <li className="font-bold text-lg">
              {"₹ " +
                Math.round(
                  data.card.info.count *
                    (data.card.info.price / 100 ||
                      data.card.info.defaultPrice / 100)
                )}
            </li>
          </div>
          <div className="relative">
            <h1 className="bg-yellow-400 py-1 pl-1 pr-3 rounded-r-full absolute font-semibold">
              {data.card.info.count}{" "}
              {data.card.info.count > 1 ? "Items" : "Item"}
            </h1>
            <img
              src={REST_URL + data.card.info.imageId}
              alt="cart item"
              className="h-28 w-36 rounded-lg mb-4 shadow-lg"
            />
            <div className="absolute flex top-24 bg-black text-white rounded-lg text-2xl">
              <li>
                <button
                  className="font-bold px-8 hover:bg-white hover:text-black"
                  onClick={() => deleteItems(data)}
                >
                  -
                </button>
              </li>
              <li>
                <button
                  className="px-7 font-bold hover:bg-white hover:text-black"
                  onClick={() => addItems(data)}
                >
                  +
                </button>
              </li>
            </div>
          </div>
        </ul>
        <div className="relative">
          {mess ? <AlertMessage data={data} /> : null}
        </div>
        <div className="relative">{del ? <AlertDelete /> : null}</div>
      </div>
    );
  }
};

export default CartItems;
