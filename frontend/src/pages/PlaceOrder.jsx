import React, { useState, useEffect, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { currency, delivery_fee, getCartAmount, cartItems, products } = useContext(ShopContext);

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    region: '',
    zipcode: '',
    country: '',
  });

  const [useSameInfo, setUseSameInfo] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [bouquetSignature, setBouquetSignature] = useState(''); // Новий стан для підпису

  const handleCheckboxChange = () => {
    setUseSameInfo(!useSameInfo);
    if (!useSameInfo) {
      setDeliveryInfo({
        ...contactInfo,
        street: '',
        city: '',
        region: '',
        zipcode: '',
        country: '',
      });
    } else {
      setDeliveryInfo({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        region: '',
        zipcode: '',
        country: '',
      });
    }
  };

  const handleConfirmClick = () => {
    if (isButtonDisabled) return;

    const whatsappMessage = `
      CONTACT INFORMATION
      First Name: ${contactInfo.firstName}
      Last Name: ${contactInfo.lastName}
      Phone: ${contactInfo.phone}
      Email: ${contactInfo.email}

      DELIVERY INFORMATION
      First Name: ${deliveryInfo.firstName}
      Last Name: ${deliveryInfo.lastName}
      Phone: ${deliveryInfo.phone}
      Email: ${deliveryInfo.email}
      Street: ${deliveryInfo.street}
      City: ${deliveryInfo.city}
      Region: ${deliveryInfo.region}
      Zipcode: ${deliveryInfo.zipcode}
      Country: ${deliveryInfo.country}

      BOUQUET SIGNATURE:
      ${bouquetSignature}

      ORDER ITEMS:
      ${cartItems &&
        Object.keys(cartItems).map((itemId) => {
          const productData = products.find((product) => product._id === itemId);
          if (productData && cartItems[itemId] > 0) {
            return `${productData.name} x${cartItems[itemId]}`;
          }
          return '';
        }).join('\n')}

      TOTAL: ${currency} ${getCartAmount() + delivery_fee}.00`;

    const whatsappUrl = `https://wa.me/33773592133?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank'); // Відкриває WhatsApp у новій вкладці
    
    navigate('/order-complete');
  };

  useEffect(() => {
    const areContactFieldsFilled = Object.values(contactInfo).every((field) => field.trim() !== '');
    const areDeliveryFieldsFilled = Object.values(deliveryInfo).every((field) => field.trim() !== '');
    const total = getCartAmount() + delivery_fee;

    setIsButtonDisabled(!(areContactFieldsFilled && areDeliveryFieldsFilled && total > 0));
  }, [contactInfo, deliveryInfo, getCartAmount, delivery_fee]);

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*---Left side----- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'CONTACT'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            value={contactInfo.firstName}
            onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
            required />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            value={contactInfo.lastName}
            onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
            required />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
          required />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          required />

        <label className="flex items-center gap-2 mt-3">
          <input type="checkbox" checked={useSameInfo} onChange={handleCheckboxChange} />
          Use the same information for delivery
        </label>

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            value={deliveryInfo.firstName}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })}
            disabled={useSameInfo}
            required />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            value={deliveryInfo.lastName}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })}
            disabled={useSameInfo}
            required />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          value={deliveryInfo.phone}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
          disabled={useSameInfo}
          required />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
          value={deliveryInfo.email}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
          disabled={useSameInfo}
          required />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          value={deliveryInfo.street}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, street: e.target.value })}
          required />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            value={deliveryInfo.city}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
            required />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Region"
            value={deliveryInfo.region}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, region: e.target.value })}
            required />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            value={deliveryInfo.zipcode}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipcode: e.target.value })}
            required />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            value={deliveryInfo.country}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, country: e.target.value })}
            required />
        </div>

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'BOUQUET'} text2={'SIGNATURE'} />
        </div>

        <textarea
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3 h-24 resize-none"
          placeholder="Bouquet Signature"
          value={bouquetSignature}
          onChange={(e) => setBouquetSignature(e.target.value)}
        />
      </div>

      {/*-------Right side----- */}
      <div className="flex flex-col w-full sm:max-w-[480px]">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="w-full text-end">
          <button
            onClick={handleConfirmClick}
            className={`bg-black text-white text-sm my-8 px-12 py-3 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled}
          >
            CONFIRM IN WHATSAPP
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
