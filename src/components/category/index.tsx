import { useState } from "react"
import './index.css'

export const Category=({categoryDetails, handleCategoryClick}:any)=>{
    const [isCategoryAssigned, setCategoryAccess]=useState(false)
    const {categoryName,value}=categoryDetails

    //update the category access on click of category
    const onToggleCategory=()=>{
        setCategoryAccess(!isCategoryAssigned)
        handleCategoryClick(value)
    }

    return(
        <div className="dropdown-item">
              {/* <button className="dropdown-toggle btn btn-outline" type="button" onClick={onToggleButton}>
                {categoryName}
              </button> */}
              <label className="category">
                <input className="me-2" onChange={onToggleCategory} type="checkbox"/>
                {categoryName}
              </label>
              
            </div>
    )
}