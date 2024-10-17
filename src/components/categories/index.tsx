import React, { useEffect, useState } from 'react';

import './index.css'
import { Actions } from '../actions';
import { Category } from '../category';
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from '../../store/userStore';

interface OptionType {
  label: string;
  value: string;
  subOptions?: OptionType[]; // Optional nested sub-options
}

export const CategoriesDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch=useDispatch();

  useEffect(() => {
    if (selectedOptions.length > 0) {
      dispatch(addCategories(selectedOptions));
    }
  }, [selectedOptions, dispatch]);

  const categories=useSelector((state:any)=>state.fileCategoryStore.fileCategories)

  
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

      {/* <div>
        <h4>Selected Options:</h4>
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};