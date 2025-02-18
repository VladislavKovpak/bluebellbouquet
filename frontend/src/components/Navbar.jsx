import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [visible, setVisible] = useState(false);  // Стан для видимості бокового меню
  const [showCategories, setShowCategories] = useState(false);  // Стан для спливаючого меню категорій
  const [activeCategory, setActiveCategory] = useState(''); // Стан для активної категорії
  const { setShowSearch, getCartCount, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  // Логіка для виходу з акаунту
  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  // Функція для вибору категорії
  const handleCategorySelect = (category) => {
    setActiveCategory(category);  // Оновлюємо активну категорію
    navigate(`/collection?category=${category}`);  // Перехід на сторінку COLLECTION з переданою категорією
    setVisible(false);  // Закриваємо меню після вибору категорії
    setShowCategories(false);  // Закриваємо меню категорій
  };

  // Функція для перегляду всіх товарів
  const handleShopAll = () => {
    setActiveCategory('');  // Скидаємо активну категорію
    navigate('/collection');  // Перехід на сторінку COLLECTION без фільтрації
    setVisible(false);  // Закриваємо меню після вибору
    window.location.href = '/collection';
    setShowCategories(false);  // Закриваємо меню категорій
  };

  // Стиль для активної категорії
  const activeCategoryStyle = 'bg-black text-white';

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-56' alt="Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to="/collection" className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to="/about" className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to="/contact" className='flex flex-col items-center gap-1'>
          <p>CONTACTS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <Link to='/collection'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
        </Link>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>

          <NavLink onClick={() => setShowCategories(!showCategories)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>

          {/* Спливаюче меню для категорій */}
          {showCategories && (
            <div className='py-2'>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === '' ? activeCategoryStyle : ''}`}
                onClick={handleShopAll}
              >
                Shop all
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'PREMIUM offer' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('PREMIUM offer')}
              >
                PREMIUM offer
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'Bouquets' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('Bouquets')}
              >
                Bouquets
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'Flower arrangements' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('Flower arrangements')}
              >
                Flower arrangements
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'WOW - Baskets' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('WOW - Baskets')}
              >
                WOW - Baskets
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'Mono bouquet' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('Mono bouquet')}
              >
                Mono bouquet
              </div>
              <div
                className={`pl-6 border cursor-pointer ${activeCategory === 'Holiday decoration' ? activeCategoryStyle : ''}`}
                onClick={() => handleCategorySelect('Holiday decoration')}
              >
                Holiday decoration
              </div>
            </div>
          )}

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
