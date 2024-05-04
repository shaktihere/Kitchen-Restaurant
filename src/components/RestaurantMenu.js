import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

  const [menuData, setMenuData] = useState(null);
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState();

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=" +
        resId +
        "&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER"
    );
    const json = await data.json();
    setMenuData(json.data.cards);
  };

  //const { name, cuisines, costForTwoMessage } = menuData[2]?.card?.card?.info;

  //const {menuCards} = menuData[4]?.card.
  if (menuData === null) {
    return <Shimmer />;
  }
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    areaName,
    totalRatingsString,
    sla,
  } = menuData[2]?.card?.card?.info;
  const { cards } = menuData[4]?.groupedCard?.cardGroupMap?.REGULAR;
  return (
    <div className="menu text-center ml-96 mr-80">
      <div className="text-left">
        <div className="   rounded-xl mb-4 pb-3">
          <h1 className="text-4xl font-bold ml-4 pt-2">{name}</h1>
          <div className="border border-gray-100 m-4 bg-white rounded-xl pl-2 shadow-2xl font-mono">
            <h3 className="font-bold pt-4">
              ⭐ {avgRating}({totalRatingsString}) - {costForTwoMessage}
            </h3>
            <h3 className="pl-1">{cuisines.join(", ")}</h3>
            <ul className="flex ml-1">
              <li className="font-bold mr-4">Outlet </li>
              <li>{areaName}</li>
            </ul>
            <h3 className="pl-1 font-bold pb-4">{sla.slaString}</h3>
          </div>
        </div>
        {cards.map((item, index) => {
          return (
            <RestaurantCategory
              data={item.card.card}
              showItems={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index)}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
