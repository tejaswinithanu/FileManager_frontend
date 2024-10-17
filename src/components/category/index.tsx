import { useState } from "react"
import './index.css'

export const Category=({categoryDetails, handleCategoryClick}:any)=>{
    const [isCategoryAssigned, setCategoryAccess]=useState(false)
    const {categoryName}=categoryDetails

    const onToggleCategory=()=>{
        setCategoryAccess(!isCategoryAssigned)
        handleCategoryClick(categoryName)
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