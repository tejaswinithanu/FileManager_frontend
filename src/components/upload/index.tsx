import {v4 as uuidv4} from 'uuid';
import { useDispatch } from "react-redux"
import { addFile } from "../../store/fileStore"



export const Upload=()=>{

    const dispatch=useDispatch()

    const handleFileChange=(event:any)=>{
        const file=event.target.files?.[0]
        dispatch(addFile({id:uuidv4(),name:file.name,size:file.size,type:file.type, fileObject:file}))
    }

    

    return(
        <div>
            <input onChange={handleFileChange} id="file" type="file" className="file-input"/>
            <label htmlFor="file" className="btn btn-primary px-4">Upload</label>
        </div>
    )
}