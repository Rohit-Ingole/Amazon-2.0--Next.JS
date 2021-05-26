import { useDispatch } from "react-redux";
import { cartItems } from "../slices/cartSlice";

import { commerce } from "../lib/commerce";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";

import Image from "next/image";
import CheckoutProduct from "../components/CheckoutProduct";

const checkout = () => {
  const dispatch = useDispatch();
  const [session] = useSession();
  const [cart, setCart] = useState();

  useEffect(async () => {
    const cartRes = await commerce.cart.retrieve();
    dispatch(cartItems(cartRes));
    setCart(cartRes);
  }, []);

  return (
    <div className="bg-gray-100 mb-0 px-2">
      <main className="lg:flex max-w-screen-xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex-col flex p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {cart?.total_items === 0
                ? "Your Shopping Cart Is Empty"
                : "Shopping Cart"}
            </h1>

            {console.log(cart)}

            {cart?.line_items?.map((item) => (
              <CheckoutProduct item={item} key={item.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md h-1/4 mt-10">
          {cart?.total_items > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {"("} {cart?.total_items} items {")"} :{" "}
                <span className="font-semibold">
                  {cart?.subtotal?.formatted_with_symbol}
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to Checkout" : "Proceed To Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
