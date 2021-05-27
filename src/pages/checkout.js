import { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { commerce } from "../lib/commerce";
import { useRouter } from "next/router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const steps = [{ title: "Shipping Address" }, { title: "Payment Details" }];

const checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState(null);

  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  let cart;

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(async () => {
    const cart = await commerce.cart.retrieve();

    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) router.push("/");
        }
      };
      generateToken();
    }
  }, [cart]);

  useEffect(() => {
    if (shippingData) {
      nextStep();
    }
  }, [shippingData]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        setShippingData={setShippingData}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        backStep={backStep}
        nextStep={nextStep}
        setOrder={setOrder}
        setErrorMessage={setErrorMessage}
      />
    );

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <h5 className="text-lg mx-5 mt-5 font-mono font-semibold text-gray-600">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </h5>
          <div className="m-5 h-1 bg-gray-200 rounded-full" />
          <p className="text-sm font-mono font-semibold mx-5 text-gray-600">
            Order ref: {order.customer_reference}
          </p>
        </div>
        <button
          className="h-10 my-3 w-32 mx-5 rounded-md bg-yellow-400 border-2 border-yellow-500 text-sm font-mono font-semibold text-gray-600"
          onClick={() => {
            router.push("/");
          }}
        >
          Back to home
        </button>
      </>
    ) : (
      <div className="w-full flex items-center justify-center h-40">
        <Loader type="Circles" color="gray" height={50} width={50} />
      </div>
    );

  return (
    <>
      <div className="w-full h-12" />
      <div className="bg-gray-100 border-2 border-gray-300 shadow-lg rounded-md lg:w-3/5 mx-auto w-11/12">
        <h1 className="text-gray-600 font-mono font-bold text-3xl text-center my-3">
          Checkout
        </h1>
        {activeStep < 3 && (
          <p className="text-gray-500 mb-2 ml-5">
            *{" "}
            <span className="font-mono font-semibold text-sm">
              Do not enter real data and use stripe test card.
            </span>
          </p>
        )}

        <Stepper
          steps={steps}
          activeStep={activeStep}
          size={28}
          activeColor="#F59E0B"
          completeColor="#7bed8a"
        />
        {activeStep === steps.length ? (
          <Confirmation />
        ) : (
          checkoutToken && <Form />
        )}
      </div>
    </>
  );
};

export default checkout;
