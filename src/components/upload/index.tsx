import {v4 as uuidv4} from 'uuid';
import { useDispatch } from "react-redux"
import { addFile } from "../../store/fileStore"

export const Upload=()=>{

    //const [selectedFile,uploadFile]=useState({});

    const dispatch=useDispatch()

    const handleFileChange=async (event:any)=>{
        const file=event.target.files?.[0]
        

        const formData:any = new FormData();
        formData.append('file', file);
        console.log(formData.get('file').name);
        const userMail=localStorage.getItem('mail')

        try{
            const response=await fetch(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?userMail=${userMail}`,
                {
                    method:'POST',
                    body:formData
                }
            )
            console.log(response)

            if(response.ok){

                const result =await response.text();
                console.log(result);
                dispatch(addFile({id:uuidv4(),name:file.name,size:file.size,type:file.type, url:result}))
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