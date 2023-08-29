import '../../styles/CategoryDetail.css';



const CategoryDetails = ({ category }) => {
      if(!category) return null;

    return (
      <div className='btn-cat'>
        <button className='cat-name'>
        {category.name}
      </button>
      </div>
    );
  }
  
  export default CategoryDetails;