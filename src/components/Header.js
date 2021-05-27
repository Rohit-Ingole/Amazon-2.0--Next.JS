import Image from "next/image";
import { useRouter } from "next/router";

import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectCart } from "../slices/cartSlice";

const Header = () => {
  const cart = useSelector(selectCart);
  const router = useRouter();

  const [session] = useSession();

  return (
    <header>
      <div className="bg-amazon_blue pb-2 sm:pb-0 px-2 sm:px-0">
        <div className="flex items-center bg-amazon_blue flex-grow p-1 py-2">
          <div
            className="mt-2 flex items-center flex-grow sm:flex-grow-0 mr-3.5"
            onClick={() => router.push("/")}
          >
            <Image
              src="https://links.papareact.com/f90"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>
          <div className="inputContainer hidden sm:flex">
            <input
              type="text"
              className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            />
            <SearchIcon className="h-12 p-4" />
          </div>

          <div className="text-white flex items-center space-x-4 sm:space-x-6 text-xs mx-3 sm:mx-6 whitespace-nowrap">
            <div className="link" onClick={!session ? signIn : signOut}>
              <p>
                {session ? `Hello, ${session.user.name}` : "Hello, Sign In"}
              </p>
              <p className="font-extrabold md:text-sm">Accounts & Lists</p>
            </div>
            <div className="link hidden sm:block">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div
              className="link flex items-center relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCartIcon className="h-10 " />
              <p className="mt-2 font-extrabold md:text-sm hidden md:inline">
                Basket
              </p>
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {!cart ? "0" : cart?.total_items}
              </span>
            </div>
          </div>
        </div>
        <div className="flex sm:hidden inputContainer">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
      </div>

      <div className="bg-amazon_blue-light flex items-center w-full text-white text-xs sm:text-sm lg:space-x-3 space-x-2.5 py-1 sm:px-6 font-semibold ">
        <MenuIcon className="h-6 mr-1 link" />
        <p className="link">All</p>
        <p className="link">Prime Videos</p>
        <p className="link">Amazon Business</p>
        <p className="link">Todays Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
