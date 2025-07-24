import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false); // уведомление

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  const handleBack = () => {
    if (window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex justify-end mb-5">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`thumbnail-${index}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Main product" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-3.5" alt="star" />
            ))}
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="mt-12">
            {showMessage && (
              <div className="mb-4 text-green-600 bg-green-100 border border-green-300 px-4 py-2 rounded">
                Product added to cart!
              </div>
            )}
            <button
              onClick={() => {
                addToCart(productData._id);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
              }}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex-flex-col gap-1">
              <p>Original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Fast delivery & best quality</p>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
