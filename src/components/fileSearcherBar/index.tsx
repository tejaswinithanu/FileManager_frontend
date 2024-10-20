import { useDispatch } from "react-redux"
import { Search } from "../search"
import { Upload } from "../upload"

import './index.css'
import { setSortValue } from "../../store/fileStore"

const sortOptions=[
    {
        optionName:'Default',
        value:'default'
    },
    {
        optionName:'Name',
        value:'name'
    },
    {
        optionName:'Date - Asc',
        value:'date-asc'
    },
    {
        optionName:'Date - Desc',
        value:'date-desc'
    }
]

export const FileSearcherBar=()=>{
    const dispatch=useDispatch()

    const handleSort=(event:any)=>{
        dispatch(setSortValue(event.target.value))
    }

    return(
        <div className="search-bar-container">

            <div className="sort-container px-2">
                <p className="me-2 mb-0">Sort by :</p>
                <select onChange={handleSort} className="drop-down-ele m-0">
                    {
                        sortOptions.map((eachOption)=>(
                            <option key={eachOption.value} value={eachOption.value}>{eachOption.optionName}</option>
                        ))
                    }
                </select>
            </div>
            
            <Search/>

            <div className="d-flex">
           <Upload/>
            </div>

            
        </div>
    )
}

