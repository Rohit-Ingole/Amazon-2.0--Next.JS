import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { commerce } from "../lib/commerce";
import { useEffect, useState } from "react";

const AddressForm = ({ checkoutToken, setShippingData }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.shippingOption = shippingOption;
    setShippingData(data);
  };

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-5 grid grid-cols-1 lg:grid-cols-2"
    >
      <input
        {...register("firstname")}
        placeholder="First Name"
        required="true"
        className="checkoutInput"
        type="text"
      />
      <input
        {...register("lastname")}
        placeholder="Last Name"
        required="true"
        className="checkoutInput"
        type="text"
      />
      <input
        {...register("email")}
        placeholder="Email"
        required="true"
        className="checkoutInput"
        type="email"
      />
      <textarea
        {...register("address")}
        placeholder="Address"
        required="true"
        className="checkoutInput row-span-2 h-textarea"
        type="text"
        style={{ resize: "none" }}
      />
      <input
        {...register("city")}
        placeholder="City"
        required="true"
        className="checkoutInput"
        type="text"
      />
      <input
        {...register("zipcode")}
        placeholder="Zip / Postal Code"
        required="true"
        className="checkoutInput"
        type="text"
      />

      <div className="flex flex-col">
        <select
          {...register("shippingCountry")}
          className="checkoutInput"
          onChange={(e) => {
            setShippingCountry(e.target.value);
          }}
        >
          {Object.entries(shippingCountries).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <select
          {...register("shippingSubdivision")}
          className="checkoutInput"
          onChange={(e) => {
            setShippingSubdivision(e.target.value);
          }}
        >
          {Object.entries(shippingSubdivisions).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <select {...register("shippingOption")} className="checkoutInput">
          {shippingOptions
            .map((sO) => ({
              id: sO.id,
              label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
            }))
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
        </select>
      </div>

      <button
        className="checkoutButton bg-yellow-400 border-yellow-500 outline-none"
        onClick={() => {
          router.push("/cart");
        }}
      >
        Cart
      </button>

      <input
        type="submit"
        value="Next"
        className="checkoutButton bg-green-400 border-green-500"
      />
    </form>
  );
};

export default AddressForm;
