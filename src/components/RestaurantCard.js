import { useContext } from "react";
import REST_URL from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resName } = props; //Always use the same name here (resName) what it is while passing in the component call, check below its name
  const { name, cuisines, avgRating, sla, areaName } = resName?.info; //De-Structuring to make code more pretty/ easy to read
  const { loggedInUser } = useContext(UserContext);
  const letters = cuisines.join(", ");
  let count = 0;
  let store = "";
  let ans = "";
  for (let i in name) {
    if (count > 8) {
      ans += ans + "....";
      break;
    }
    ans += name[i];
    count++;
  }

  count = 0;
  for (let i in letters) {
    if (count > 25) {
      if (letters[i] === "," || letters[i] === " ") {
        store += letters[i] + "...";
        break;
      }
      store += ",...";
      break;
    }
    store += letters[i];
    count++;
  }
  return (
    <div className="m-4 p-4 w-[250px]  hover:cursor-pointer">
      <img
        src={REST_URL + resName.info.cloudinaryImageId}
        className="h-52 hover:h-64 w-72 shadow-2xl rounded-xl"
      />
      <h2 className="font-bold text-lg py-1">{ans}</h2>
      <ul className="flex list-disc font-bold ">
        <li className="list-none ">
          <h4 className="mr-6">⭐ {avgRating}</h4>
        </li>
        <li>
          {" "}
          <h4>{sla.deliveryTime} Minutes</h4>
        </li>
      </ul>
      <h4>{store}</h4>
      <h4>{loggedInUser}'s Order</h4>
      <h4>{areaName}</h4>
    </div>
  );
};

//Higher order component

//Input ==> RestaurantCard Output==> RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="sticky">
        <label className="absolute bg-green-500 text-white m-2 p-2 rounded-lg">
          Fast Delivery
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
