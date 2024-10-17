import { useState } from 'react'
import './index.css'
import { useDispatch } from 'react-redux';
import { updateFilterValue } from '../../store/fileStore';

export const Search=()=>{
    const [searchValue,setSearchValue]=useState("");
    const dispatch=useDispatch();

    const handleSearch=(event:any)=>{
        event.preventDefault()
        dispatch(updateFilterValue(searchValue));
    }

    const onChangeSearchValue=(event:any)=>{
        setSearchValue(event.target.value)
    }

    return(
        <form onSubmit={handleSearch} className="search-bar">
            <input
            value={searchValue}
            type="text"
            placeholder="Search by file name"
            className="form-control"
            onChange={onChangeSearchValue}
            />
            <button type="submit" className="btn btn-primary ms-3">Search</button>
        </form>
    )
}