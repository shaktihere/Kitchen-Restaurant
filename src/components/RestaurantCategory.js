import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const value = data;
  const [imgDropDown, setImgDropDown] = useState(
    "https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
  );
  const handleClick = () => {
    if (
      imgDropDown ===
      "https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
    ) {
      setShowIndex();
      setImgDropDown(
        "https://icons.veryicon.com/png/o/internet--web/industrial-icon/up-arrow.png"
      );
    } else {
      setImgDropDown(
        "https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
      );
    }
  };
  if (value.title && value.itemCards) {
    value.itemCards.map((item) => {
      item.card.info["count"] = 0;
    });
    return (
      <div>
        <div className="headerMenu pl-3 pr-3 mt-3 mb-3 border-b border-gray-100 shadow-sm shadow-gray-200">
          <div className="cursor-pointer" onClick={handleClick}>
            <ul className="flex justify-between">
              <li className="font-bold text-lg">{value.title}</li>
              <li>
                <img
                  src={imgDropDown}
                  alt="dropdown"
                  className="w-4 h-4 pt-1"
                />
              </li>
            </ul>
          </div>
          {showItems && <ItemList items={value.itemCards} />}
        </div>
      </div>
    );
  }
};

export default RestaurantCategory;
