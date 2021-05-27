import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { commerce } from "../lib/commerce";
import Review from "./Review";

const stripePromise = loadStripe(
  "pk_test_51IhBXQSBTHVYIC9JAMU2mNNqUbJpAafIAkZnGmNibA8c2McioTgEGgON2WMoCwB1Tzl2DOYPajLQvtO1zhmYCk23005pRpo4gR"
);

const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();
};

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  nextStep,
  setErrorMessage,
  setOrder,
}) => {
  const onCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  };

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log(shippingData);

      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zipcode,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <h5 className="mx-5 font-mono text-lg text-gray-600 font-bold mt-3">
        Payment Method
      </h5>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement className="mx-5 my-5 border-2 border-gray-200 rounded-md px-3 h-12 grid items-center" />
              <div className="flex justify-between">
                <button
                  onClick={backStep}
                  className="checkoutButton bg-yellow-400 border-yellow-500 outline-none text-sm w-28 h-10 mb-5"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!stripe}
                  className="checkoutButton bg-green-400 border-green-500 outline-none text-sm w-40 h-10 mb-5"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
