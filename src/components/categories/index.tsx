import React, { useState } from 'react';

import './index.css'
import { Actions } from '../actions';
import { Category } from '../category';

interface OptionType {
  label: string;
  value: string;
  subOptions?: OptionType[]; // Optional nested sub-options
}

export const CategoriesDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  // Main dropdown options
  const options: OptionType[] = [
    { label: 'Option 1', value: 'option1' },
    {
      label: 'Option 2 (Has Sub-options)',
      value: 'option2',
      subOptions: [
        { label: 'Sub-option 1', value: 'suboption1' },
        { label: 'Sub-option 2', value: 'suboption2' },
        { label: 'Sub-option 3', value: 'suboption3' },
      ],
    },
    { label: 'Option 3', value: 'option3' },
  ];


  // Handle sub-option checkbox change
  const handleSubOptionChange = (subOptionValue: string) => {   
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(subOptionValue)
        ? prevSelected.filter((value) => value !== subOptionValue)
        : [...prevSelected, subOptionValue]
    );
  };

  // Handle main checkbox change
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
    <div>
      <div className="dropdown">
        <button type="button" onClick={toggleDropdown} className="dropdown-toggle btn btn-primary">
          Select Options
        </button> 

        {isDropdownOpen && (
          <div className=''>
          {options.map((option) => (
            <Category key={option.value} handleCategoryClick={handleCategoryClick} categoryDetails={option}/>
          ))}
        </div>
        )}
      </div>

      <div>
        <h4>Selected Options:</h4>
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};