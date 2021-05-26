import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

import { commerce } from "../lib/commerce";

import { cartItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const Home = ({ products }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const cartRes = await commerce.cart.retrieve();
    dispatch(cartItems(cartRes));
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="mx-auto max-w-screen-xl">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { data } = await commerce.products.list();

  return {
    props: {
      products: data,
    },
  };
}
