
import './index.css'

import { useNavigate } from 'react-router-dom'

export const FolderItem=({category}:any)=>{
    const {categoryName,value}=category
    const navigate=useNavigate()

    const handleCategoryClick=()=>{
        navigate(`/files/${value}`)
    }

    return(
        <li onDoubleClick={handleCategoryClick} className='folder-item'>
            <img className='folder-img' alt="file-manager" src="https://res.cloudinary.com/dywrzseia/image/upload/v1729358009/1-H8Mj3R6OSci9gAAAABJRU5ErkJggg_jifz42.png"/>
            <p className='category-name'>{categoryName}</p>
        </li>
    )
}