import { Search } from "../search"
import { Upload } from "../upload"

import './index.css'

export const FileSearcherBar=()=>{
    return(
        <div className="search-bar-container">

            <div className="sort-container px-2">
                <p className="me-2 mb-0">Sort by :</p>
                <select className="drop-down-ele m-0">
                    <option>Name</option>
                    <option>Date - Asc</option>
                    <option>Date - Desc</option>
                </select>
            </div>
            
            <Search/>

            <div className="d-flex">
           <Upload/>
            </div>

            
        </div>
    )
}

