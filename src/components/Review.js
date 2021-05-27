const Review = ({ checkoutToken }) => {
  return (
    <div>
      <h3 className="text-xl text-gray-600 font-mono font-semibold ml-5 mt-3">
        Order Summary
      </h3>
      <div>
        {checkoutToken.live.line_items.map((product) => (
          <div className="flex items-center justify-between mx-5 my-8">
            <div>
              <h4>{product.name}</h4>
              <p className="text-sm text-gray-500 font-semibold">
                Quantity : {product.quantity}
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {product.line_total.formatted_with_symbol}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mx-5 font-mono text-xl text-gray-800 font-bold">
        <h4>Total</h4>
        <p>{checkoutToken.live.subtotal.formatted_with_symbol}</p>
      </div>

      <div className="mt-5 h-1 bg-gray-500 mx-4 rounded-full" />
    </div>
  );
};

export default Review;
