import React, { useEffect, useState } from 'react';

import './index.css'

import { Category } from '../category';
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from '../../store/userStore';


export const CategoriesDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch=useDispatch();

  //add the selected categories on toggle of category click
  useEffect(() => {
    if (selectedOptions.length > 0) {
      dispatch(addCategories(selectedOptions));
    }
  }, [selectedOptions, dispatch]);

  //get all the available categories to render the categories dropdown
  const categories=useSelector((state:any)=>state.fileCategoryStore.fileCategories)

  //update the selectedCategories based on which category is clicked
  const handleCategoryClick = (optionValue: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionValue)
        ? prevSelected.filter((value) => value !== optionValue)
        : [...prevSelected, optionValue]
    );
    
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    console.log('clicked')
  };


  return (
    <div className='form-control'>
      <div className="dropdown m-0">
        <button type="button" onClick={toggleDropdown} className="dropdown-toggle btn btn-warning">
          Assign Categories
        </button> 

        {isDropdownOpen && (
          <div className='ms-3'>
          {categories.map((option:any) => (
            <Category key={option.id} handleCategoryClick={handleCategoryClick} categoryDetails={option}/>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};