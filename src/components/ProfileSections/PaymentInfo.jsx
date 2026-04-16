import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcAmex } from "react-icons/fa6";
import { FaCcDiscover } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";

const PaymentInfo = () => {
  const { user, updatePaymentInfo, addBillingAddress } = useAuth();
  const methods = user.paymentMethod || [];
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBillingFormVisible, setIsBillingFormVisible] = useState(false);
  const billingAddress = user.billingAddress || [];

  const [cardData, setCardData] = useState({
    cardType: "",
    cardNumber: "",
    expiry: "",
    securityCode: "",
    firstName: "",
    lastName: "",
    billingAddress: "",
  });

  const handleCardBrand = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const creditCardUI = {
    Visa: { 
    color: "#1a1f71", 
    icon: <RiVisaFill size={32} color="#1a1f71"/> 
  },
  MasterCard: { 
    color: "#F79E1B", 
    icon: <FaCcMastercard size={32} color="#FF5F00" /> 
  },
  Amex: { 
    color: "#2e77bb", 
    icon: <FaCcAmex size={32} color="#2e77bb" /> 
  },
  Discover: { 
    color: "#86b8cf", 
    icon: <FaCcDiscover size={32} color="#86b8cf" /> 
  },
  Default:{
    color: "#6b7280",
    icon: <FaCreditCard size={32} color="#6b7280" />  
  }
  };

  const handleCardUpdate = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
    }
    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
    }

    if (name === "firstName" || name === "lastName") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setCardData({ ...cardData, [name]: value });
  };

  const addPaymentMethod = () => {
    const newMethod = {
      id: Date.now(),
      type: cardData.cardType,
      cardNumber: cardData.cardNumber,
      lastFour: cardData.cardNumber.slice(-4),
      expiry: cardData.expiry,
      firstName: cardData.firstName,
      lastName: cardData.lastName,
    };
    const updatedMethods = [...methods, newMethod];
    updatePaymentInfo(updatedMethods);
    alert("Payment method added successfully");
  };

  const removeMethod = (id) => {
    const updatedMethods = methods.filter((m) => m.id !== id);
    updatePaymentInfo(updatedMethods);
    alert("Payment method removed successfully");
  };

  const [billingData, setBillingData] = useState({
    type: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const addBillingInfo = () => {
    const newAddress = {
      id: Date.now(),
      type: billingData.type,
      address: billingData.address,
      city: billingData.city,
      state: billingData.state,
      zip: billingData.zip,
      country: billingData.country,
    };
    const updatedAddresses = [...billingAddress, newAddress];
    addBillingAddress(updatedAddresses);
    alert("Billing address added successfully");
  };

  const removeAddress = (id) => {
    const updatedAddresses = billingAddress.filter((a) => a.id !== id);
    addBillingAddress(updatedAddresses);
    alert("Billing address removed successfully");
  };

  const handleBillingUpdate = (e) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  return (
    <>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
        <p className="text-gray-500 mb-8">
          Manage your saved cards and billing information.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {methods.length > 0 ? (
            methods.map((method) => {
              const cardUI = creditCardUI[method.type] || creditCardUI.Default;
            
              return(
              <div
                key={method.id}
                style={{ backgroundColor:`${cardUI.color} ` }}
                className="relative w-full max-w-[300px] aspect-[1.58/1] shadow-md p-4 border rounded-lg border-gray-200 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div className="bg-gray-100 p-2 rounded text-xs font-bold uppercase">
                    {cardUI.icon}
                  </div>
                  <button
                    onClick={() => removeMethod(method.id)}
                    className="text-red-500 hover:underline text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
                <div className=" flex  flex-col items-start gap-2">
                  <p className="font-semibold text-gray-300">
                    **** **** **** {method.lastFour}
                  </p>
                  <p className="text-xs text-gray-200 italic">
                    Expires: {method.expiry}
                  </p>
                  <p className="text-sm font-semibold text-gray-300 italic">
                    {method.firstName} {method.lastName}
                  </p>
                </div>
              </div>
            )})
          ) : (
            <p className="text-gray-400 italic">No payment methods saved.</p>
          )}
        </div>
        {isFormVisible && (
          <div className="mt-8 p-6 border rounded-xl bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardUpdate}
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-2 border rounded"
                />
                <select
                  name="cardType"
                  value={cardData.cardType}
                  onChange={handleCardBrand}
                  className="w-full p-2 border rounded mt-2"
                >
                  <option value="">Select Card Type</option>
                  <option value="Visa">Visa</option>
                  <option value="MasterCard">MasterCard</option>
                  <option value="Amex">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleCardUpdate}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  name="securityCode"
                  value={cardData.securityCode}
                  onChange={handleCardUpdate}
                  placeholder="123"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={cardData.firstName}
                  onChange={handleCardUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={cardData.lastName}
                  onChange={handleCardUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  if (cardData.cardNumber.length < 16) {
                    alert("Please enter a valid 16-digit card number.");
                    return;
                  }
                  addPaymentMethod();
                  setIsFormVisible(false);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Save Card
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isFormVisible && (
          <button
            className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsFormVisible(true)}
          >
            Add New Card
          </button>
        )}
        <hr className="my-10 border-gray-300" />
      </div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mt-10">Billing Address</h2>
        <div className="flex flex-col gap-4 mt-6">
          {billingAddress.length > 0 ? (
            billingAddress.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-lg border-gray-200"
              >
                <p className="text-sm text-gray-500 italic">
                  {address?.type} Address
                </p>
                <p className="font-semibold text-gray-800">
                  {address?.address}
                </p>
                <p className="text-sm text-gray-500">
                  {address?.city}, {address?.state} {address?.zip}
                </p>
                <p className="text-sm text-gray-500">{address?.country}</p>
                <button
                  onClick={() => removeAddress(address.id)}
                  className="text-red-500 hover:underline text-sm font-medium mt-2"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No billing addresses saved.</p>
          )}
        </div>
        {isBillingFormVisible && (
          <div className="mt-8 p-6 border rounded-xl bg-gray-50">
            <label className="block text-sm font-medium text-gray-700">
              Address Type
            </label>
            <select
              name="type"
              value={billingData.type}
              onChange={handleBillingUpdate}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Address Type</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Shipping">Shipping</option>
              <option value="Other">Other</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={billingData.address}
              onChange={handleBillingUpdate}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingData.city}
                  onChange={handleBillingUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={billingData.state}
                  onChange={handleBillingUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={billingData.zip}
                  onChange={handleBillingUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={billingData.country}
                  onChange={handleBillingUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  addBillingInfo();
                  setIsBillingFormVisible(false);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Save Address
              </button>
              <button
                onClick={() => setIsBillingFormVisible(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!isBillingFormVisible && (
          <button
            className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsBillingFormVisible(true)}
          >
            Add New Address
          </button>
        )}
      </div>
    </>
  );
};

export default PaymentInfo;
