import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

import { commerce } from "../lib/commerce";

const Home = ({ products }) => {
  return (
    <div className="bg-gray-100">
      <Header />
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
