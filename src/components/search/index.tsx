import { useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterValue } from '../../store/fileStore';

export const Search=()=>{
    const inputValue=useSelector((state:any)=>state.fileStore.filterValue)
    const [searchValue,setSearchValue]=useState("");
    const dispatch=useDispatch();

    const handleSearch=(event:any)=>{
        event.preventDefault() 
        dispatch(updateFilterValue(event.target.value));
    }

    const onChangeSearchValue=(event:any)=>{
        dispatch(updateFilterValue(event.target.value));
        setSearchValue(event.target.value)
    }

    return(
        <form onSubmit={handleSearch} className="search-bar">
            <input
            value={inputValue}
            type="text"
            placeholder="Search by file name"
            className="form-control"
            onChange={onChangeSearchValue}
            />
            {/* <button type="submit" className="btn btn-primary ms-3">Search</button> */}
        </form>
    )
}