import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <Product product={product} key={product.id} />
      ))}
      <img
        src="https://links.papareact.com/dyz"
        alt=""
        className="md:col-span-full"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductFeed;
