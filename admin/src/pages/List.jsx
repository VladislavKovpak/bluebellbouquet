import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null); // Зберігаємо оригінальні значення продукту

  // Fetch list of products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove product');
    }
  };

  // Update product logic
  const handleEdit = (product) => {
    setEditingProduct({ ...product }); // Створюємо копію продукту для редагування
    setOriginalProduct({ ...product }); // Зберігаємо оригінальний продукт
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editingProduct).forEach(([key, value]) => {
        if (key.startsWith('image') && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.put(
        `${backendUrl}/api/product/update/${editingProduct._id}`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingProduct(null);
        fetchList(); // Refresh the list after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingProduct(null);
  };

  // Перевірка на зміни
  const isUpdateDisabled = () => {
    if (!editingProduct || !originalProduct) return true;
    return JSON.stringify(editingProduct) === JSON.stringify(originalProduct);
  };

  // Effect hook to fetch products when the component mounts
  useEffect(() => {
    fetchList();
  }, [token]);

  return (
    <div className="product-list">
      <h1 className="text-2xl mb-4">Product List</h1>
      
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {list.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
        >
          <img className="w-12 h-12 object-cover" src={item.image[0]} alt={item.name} />
          
          {editingProduct && editingProduct._id === item._id ? (
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                placeholder="Product name"
                className="w-full px-3 py-2"
                required
              />
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleInputChange}
                placeholder="Product description"
                className="w-full px-3 py-2"
                required
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                placeholder="Product price"
                className="w-full px-3 py-2"
                required
              />
              <select
                name="category"
                value={editingProduct.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2"
              >
                <option value="PREMIUM offer">PREMIUM offer</option>
                <option value="Bouquets">Bouquets</option>
                <option value="Flower arrangements">Flower arrangements</option>
                <option value="WOW - Baskets">WOW - Baskets</option>
                <option value="Mono bouquet">Mono bouquet</option>
                <option value="Holiday decoration">Holiday decoration</option>
              </select>
              <div>
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={editingProduct.bestseller}
                  onChange={handleInputChange}
                />
                <label className="ml-2">Bestseller</label>
              </div>

              {[1, 2, 3, 4].map((num) => (
                <label key={num} htmlFor={`image${num}`} className="block">
                  <span>Image {num}</span>
                  <input
                    type="file"
                    name={`image${num}`}
                    id={`image${num}`}
                    onChange={handleInputChange}
                  />
                </label>
              ))}

           
                <button
                  type="submit"
                  className='w-14 py-1.5 mt-4 bg-black text-white'
                  disabled={isUpdateDisabled()} // Відключаємо кнопку, якщо немає змін
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className='w-14 py-1.5 mt-4 bg-gray-500 text-white'
                >
                  Cancel
                </button>
             
            </form>
          ) : (
            <>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <div className="flex gap-4 justify-end items-center">
                <button className='w-14 py-1.5 mt-4 bg-black text-white' onClick={() => handleEdit(item)} type='submit'>Edit</button>
                <button className='w-14 py-1.5 mt-4 bg-black text-white' onClick={() => removeProduct(item._id)} type='submit'>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
