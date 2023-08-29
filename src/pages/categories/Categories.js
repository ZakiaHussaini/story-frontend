import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryDetails from './CategoryDetails.js';
import '../../styles/Category.css';
import PostCreateForm from '../posts/PostCreateForm.js';

function Categories() {

    const [categories, setCategories] = useState([]);



  async function getCategories() {
    const response = await axios.get('/categories');
    setCategories(response.data.results);
    console.log(categories)
  }
 
useEffect(() => {
  getCategories();
},[]);

  return (
    <div className='category-container'>
        
      {categories.length > 0 &&
      categories.map((category) => (
        <>
       <CategoryDetails category={category} />
</>
   )   )}

    </div>
  );

}

export default Categories;