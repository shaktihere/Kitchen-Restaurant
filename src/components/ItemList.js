import React from "react";
import REST_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    console.log("h");
    dispatch(addItem(item));
  };
  if (items) {
    return (
      <div>
        {items.map((item) => {
          return (
            <div
              key={item.card.info.id}
              className="border-b-2 pb-4 border-gray-200 p-2 m-2"
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{item.card.info.name}</div>
                  <div>
                    ₹{" "}
                    {item.card.info.price / 100 ||
                      item.card.info.defaultPrice / 100}
                  </div>
                </div>
                <div className=" relative">
                  <button
                    onClick={() => handleClick(item)}
                    className="absolute top-20    left-6 pt-2 pb-2 px-8 bg-black text-white font-bold hover:bg-white rounded-lg hover:text-black"
                  >
                    Add
                  </button>
                  <img
                    src={REST_URL + item.card.info.imageId}
                    alt="foodImage"
                    className="h-28 w-36 rounded-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ItemList;
