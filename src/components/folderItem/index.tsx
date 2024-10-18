import { useDispatch } from 'react-redux'
import './index.css'
import { setActiveCategory } from '../../store/fileCategoryStore'
import { useNavigate } from 'react-router-dom'

export const FolderItem=({category}:any)=>{
    const {categoryName,value}=category
    const navigate=useNavigate()

    const handleCategoryClick=()=>{
        navigate(`/files/${value}`)
    }

    return(
        <li onDoubleClick={handleCategoryClick} className='folder-item'>
            <img className='folder-img' alt="file-manager" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1729067882/folder-img-removebg-preview_fngpnq.png"/>
            <p>{categoryName}</p>
        </li>
    )
}