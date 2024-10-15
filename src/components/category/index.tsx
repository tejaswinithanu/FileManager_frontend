import { useState } from "react"
import { Actions } from "../actions"

export const Category=({categoryDetails, handleCategoryClick}:any)=>{
    const [isButtonClicked, setButtonClicked]=useState(false)
    const {value,label}=categoryDetails

    const onToggleButton=()=>{
        setButtonClicked(!isButtonClicked)
        handleCategoryClick(value)
    }

    return(
        <div className="dropdown-item">
              <button className="dropdown-toggle btn btn-outline" type="button" onClick={onToggleButton}>
                {label}
              </button>

              <Actions openActions={isButtonClicked}/>

              
            </div>
    )
}