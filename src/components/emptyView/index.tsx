
import './index.css'
import { Upload } from '../upload';

export const EmptyView=()=>{

    return(
        <div className='empty-view-container'>
            <img className='empty-view-image' alt="no files" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1728736212/9169253-removebg-preview_nrsuru.png"/>
            <p className='empty-view-text'>You have not added any files yet</p>
            <Upload/>
        </div>
    )
}