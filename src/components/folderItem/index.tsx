import './index.css'

export const FolderItem=({category}:any)=>{
    return(
        <li className='folder-item'>
            <img className='folder-img' alt="file-manager" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1729067882/folder-img-removebg-preview_fngpnq.png"/>
            <p>{category}</p>
        </li>
    )
}