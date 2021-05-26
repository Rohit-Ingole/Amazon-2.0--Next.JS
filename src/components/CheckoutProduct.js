import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";

import { cartItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { commerce } from "../lib/commerce";

const MAX_RATING = 5;
const MIN_RATING = 3;

const CheckoutProduct = ({ item }) => {
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5 ? true : false);

  const dispatch = useDispatch();

  const handleRemoveFromCart = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    dispatch(cartItems(response.cart));
    window.location.reload();
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    dispatch(cartItems(response.cart));
    window.location.reload();
  };

  return (
    <div className="md:grid md:grid-cols-5 flex flex-col items-center space-y-2">
      <Image
        src={item?.media?.source}
        width={200}
        height={200}
        objectFit="contain"
      />

      <div className="col-span-3 mx-5">
        <p className="lg:text-xl text-sm overflow-ellipsis">{item.name}</p>
        <div className="flex my-2">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <StarIcon className="h-5 text-yellow-500" key={index} />
            ))}
        </div>
        <p className="font-semibold">{item?.price?.formatted_with_symbol}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              loading="lazy"
              alt=""
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end w-button">
        <div className="flex w-button items-center justify-between">
          <button
            className="button w-16"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            className="button w-16"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="button"
          onClick={() => handleRemoveFromCart(item?.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
