import './index.css'

export const Search=()=>{
    return(
        <form className="search-bar">
            <input
            type="text"
            placeholder="Search by file name"
            className="form-control"
            />
            <button type="submit" className="btn btn-primary ms-3">Search</button>
        </form>
    )
}