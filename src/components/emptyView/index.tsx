
import './index.css'
import { Upload } from '../upload';

//render empty view when no files are present

interface EmptyViewProps{
    errorText:String;
    reload:boolean;
}

export const EmptyView=(props:EmptyViewProps)=>{
    const {errorText,reload}=props

    return(
        <div className='empty-view-container'>
            <img className='empty-view-image' alt="no files" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1728736212/9169253-removebg-preview_nrsuru.png"/>
            <p className='empty-view-text'>{errorText}</p>
            {reload && <Upload/>}
        </div>
    )
}