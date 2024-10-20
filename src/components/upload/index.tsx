import {v4 as uuidv4} from 'uuid';
import { useDispatch, useSelector } from "react-redux"
import { addFile, fetchFilesByCategory, setStatus } from "../../store/fileStore"


export const Upload=()=>{

    const activeCategory=useSelector((state:any)=>state.fileCategoryStore.activeCategory)

    const dispatch=useDispatch()

    const handleFileChange=async (event:any)=>{
        let file=event.target.files?.[0]
        dispatch(setStatus('loading'))
        const formData:any = new FormData();
        formData.append('file', file);
        
        const userDetails:any=localStorage.getItem('userDetails')
        const {email}=JSON.parse(userDetails)
        try{
            const response=await fetch(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?userMail=${email}&category=${activeCategory}`,
                {
                    method:'POST',
                    body:formData
                }
            )

            if(response.ok){

                const result =await response.text();
                console.log(result);
                dispatch(addFile({id:uuidv4(),name:file.name,size:file.size,type:file.type, url:result}))
                dispatch(fetchFilesByCategory(activeCategory))
            }else{
                console.log('Error in response')
            }
 
        }catch(error:any){
            console.error("Error uploading file:", error.message);
        }

    }

    

    return(
        <div>
            <input onChange={handleFileChange} id="file" type="file" className="file-input"/>
            <label htmlFor="file" className="btn btn-primary px-4">Upload</label>
        </div>
    )
}