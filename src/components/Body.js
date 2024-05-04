import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";

const Body = () => {
  //State variable - superpowerfull variable
  const [restUList, setRestUList] = useState([]); //restUList - the which will be dynamically updated using hooks, setRestUList - the list which eill be used to modify restUList(helper)
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const onlineStatus = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const [title1, setTitle1] = useState([]);
  const [title2, setTitle2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); //Fetch data from online API, this will be done after initial page rendering

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json(); //Convert object to JSON file
    setRestUList(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurant(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setTitle1(json.data.cards[1].card.card.header.title);
    setTitle2(json.data.cards[2].card.card.title);
  }; //Fetching the data and storing it to our desired array

  //Conditional Rendering - rendering based on condition
  /*if (restUList.length === 0) {
    return <Shimmer />; //Shimmer UI - fake UI till page is rendering
  }*/

  if (onlineStatus === false) return <h1>Looks like you're offline</h1>;

  return restUList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex items-center">
        <div className="Search p-4 w-1/2">
          <input
            className="border border-solid w-8/12 border-gray-400 ml-40 pl-3 pt-1 pb-1 rounded-l-full"
            type="text"
            placeholder="Search your favourite restaurant"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-2 py-1 bg-yellow-300 rounded-r-full h-8 pr-3 hover:font-bold shadow-md border"
            onClick={() => {
              //On-click filter the restaurant cards and update it in UI
              if (searchText.length === 0) {
                setFilteredRestaurant(restUList);
              } else {
                const filteredRestaurant = restUList.filter((res) =>
                  res.info.name
                    .toLowerCase()
                    .includes(searchText.toLocaleLowerCase())
                );
                setFilteredRestaurant(filteredRestaurant);
              }
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 px-2 flex items-center">
          <button
            className="bg-yellow-400 px-4 py-1 rounded-full hover:font-bold mr-16 shadow-sm"
            onClick={() => {
              const filterList = restUList.filter(
                (res) => res.info.avgRating > 4
              ); //Filter logic
              setFilteredRestaurant(filterList); //Update the list, so that it reflects in UI
            }}
          >
            Top Rated Restaurants
          </button>
          <div className="m-4 px-1 flex items-center">
            <label className="text-bold">Name </label>
            <input
              className="pl-1 border border-black ml-1"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-2xl ml-24 mb-2">{title1}</div>
        <div className="mr-20 mb-2 flex">
          <button
            className="mr-4"
            onClick={() => {
              console.log(document.querySelector(".listOfRestaurant"));
              document.querySelector(".listOfRestaurant").scrollLeft -= 500;
            }}
          >
            <img
              src="https://cdn.icon-icons.com/icons2/1238/PNG/512/scrollarrowtoleft_83879.png"
              alt="right"
              className="h-8 w-8 bg-gray-100 rounded-full border hover:border-gray-600 border-gray-400"
            />
          </button>
          <button
            onClick={() => {
              document.querySelector(".listOfRestaurant").scrollLeft += 500;
            }}
          >
            <img
              src="https://www.pngkit.com/png/detail/78-781065_png-file-scroll-right-arrow-icon.png"
              alt="right"
              className="h-8 w-8 rounded-full border hover:border-gray-600 border-gray-400"
            />
          </button>
        </div>
      </div>
      <div className="flex overflow-x-scroll ml-16 mr-16 scrollbar-hide scroll-smooth listOfRestaurant">
        <div className="grid grid-flow-col flex-none">
          {filteredRestaurant.map(
            (restaurant) =>
              restaurant.info.sla.deliveryTime < 30 ? (
                <Link to={"/restaurant/" + restaurant.info.id}>
                  <RestaurantCardPromoted
                    key={restaurant.info.id}
                    resName={restaurant}
                  />
                </Link>
              ) : (
                <Link to={"/restaurant/" + restaurant.info.id}>
                  <RestaurantCard
                    key={restaurant.info.id}
                    resName={restaurant}
                  />
                </Link>
              )
            /**resName is used here, same mentioned above */
          )}
        </div>
      </div>
      <div className="font-bold text-2xl ml-24 mb-2">{title2}</div>
      <div className="ml-16">
        <div className="flex flex-wrap">
          {filteredRestaurant.map(
            (restaurant) =>
              restaurant.info.sla.deliveryTime < 30 ? (
                <Link to={"/restaurant/" + restaurant.info.id}>
                  <RestaurantCardPromoted
                    key={restaurant.info.id}
                    resName={restaurant}
                  />
                </Link>
              ) : (
                <Link to={"/restaurant/" + restaurant.info.id}>
                  <RestaurantCard
                    key={restaurant.info.id}
                    resName={restaurant}
                  />
                </Link>
              )
            /**resName is used here, same mentioned above */
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
