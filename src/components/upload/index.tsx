import {v4 as uuidv4} from 'uuid';
import { useDispatch } from "react-redux"
import { addFile } from "../../store/fileStore"
import { useState } from 'react';
import axios from 'axios';



export const Upload=()=>{

    const [selectedFile,uploadFile]=useState({});

    const dispatch=useDispatch()

    const handleFileChange=async (event:any)=>{
        const file=event.target.files?.[0]
        

        const formData:any = new FormData();
        formData.append('file', file);
        console.log(formData.get('file').name);

        try{
            const response=await fetch('https://testsamplefnexp.azurewebsites.net/api/filefunctions',
                {
                    method:'POST',
                    body:formData
                }
            )

            if(response.ok){

                const result =await response.text();
                console.log(result);
                dispatch(addFile({id:uuidv4(),name:file.name,size:file.size,type:file.type, url:result}))
            }else{
                console.log('Error in response')
            }
 
        }catch(error){
            console.error("Error uploading file:", error);
        }

    }

    

    return(
        <div>
            <input onChange={handleFileChange} id="file" type="file" className="file-input"/>
            <label htmlFor="file" className="btn btn-primary px-4">Upload</label>
        </div>
    )
}