import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";

import { cartItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { commerce } from "../lib/commerce";

const MAX_RATING = 5;
const MIN_RATING = 3;

const Product = ({ product }) => {
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5 ? true : false);

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const dispatch = useDispatch();

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    dispatch(cartItems(item.cart));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 h-card">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product?.categories?.[0]?.name}
      </p>
      <Image
        height={200}
        width={200}
        objectFit="contain"
        src={product.media.source}
      />
      <h4 className="my-3">{product.name}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2 font-semibold">
        {removeTags(product.description)}
      </p>
      <div className="mb-5">{product.price.formatted_with_symbol}</div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="https://links.papareact.com/fdw" alt="" className="w-12" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button
        className="mt-auto button"
        onClick={() => handleAddToCart(product.id, 1)}
      >
        Add To Basket
      </button>
    </div>
  );
};

export default Product;
