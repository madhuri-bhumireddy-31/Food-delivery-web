import React, { useEffect, useState } from 'react';
import '../Add/Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Update = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  // Fetch existing food data
  const fetchFoodDetails = async () => {
    try {
      const res = await axios.get(`${url}/api/food/${id}`);
      if (res.data.success) {
        const { name, description, price, category, image } = res.data.data;
        setData({ name, description, price, category });
        setImage(`${url}/images/${image}`);
      } else {
        toast.error("Failed to load food details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching food item");
    }
  };

  useEffect(() => {
    fetchFoodDetails();
  }, [id]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (typeof image === 'object') {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(`${url}/api/food/update`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/list"); // Redirect after update
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='image' src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select className='selectt' onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>

        <button type='submit' className='add-btn'>Update</button>
      </form>
    </div>
  );
};

export default Update;
