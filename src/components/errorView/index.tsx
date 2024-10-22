import { useDispatch } from 'react-redux';
import './index.css'
import { fetchFilesByCategory } from '../../store/fileStore';

interface ErrorViewProps{
    errorMsg:String;
}

export const ErrorView=(props:ErrorViewProps)=>{
    const {errorMsg}=props

    const dispatch=useDispatch()

    const handleRetry=()=>{
        dispatch(fetchFilesByCategory())
    }

    return(
        <div className='error-view-container'>
            <img className='error-img' alt='error' src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1729530795/loading-2801_256_dirwlo.gif"/>
            <p className='error-msg'>Oops! {errorMsg}</p>
            <button onClick={handleRetry} className='custom-btn px-5'>Retry</button>
        </div>
    )
}