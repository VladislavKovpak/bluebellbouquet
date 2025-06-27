import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const location = useLocation();
  const navigate = useNavigate();

  const toggleCategory = (e) => {
    const value = e.target.value;
    const newCategory = category.includes(value) ? category.filter(item => item !== value) : [...category, value];
    setCategory(newCategory);

    navigate({
      pathname: '/collection',
      search: `?category=${newCategory.join(',')}`,
    });
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    if (categoryFromUrl) {
      setCategory(categoryFromUrl.split(','));
    }
  }, [location]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          CATEGORIES
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'PREMIUM offer'} checked={category.includes('PREMIUM offer')} onChange={toggleCategory} /> PREMIUM offer
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bouquets'} checked={category.includes('Bouquets')} onChange={toggleCategory} /> Bouquets
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Flower arrangements'} checked={category.includes('Flower arrangements')} onChange={toggleCategory} /> Flower arrangements
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'WOW - Baskets'} checked={category.includes('WOW - Baskets')} onChange={toggleCategory} /> WOW - Baskets
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Mono bouquet'} checked={category.includes('Mono bouquet')} onChange={toggleCategory} /> Mono bouquet
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Holiday decoration'} checked={category.includes('Holiday decoration')} onChange={toggleCategory} /> Holiday decoration
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection;
