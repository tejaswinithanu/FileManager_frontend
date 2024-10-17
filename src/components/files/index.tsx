import { useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"
import Modal from 'react-modal'
import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'
import axios from "axios";
import { useState } from "react";

Modal.setAppElement('#root')



export const Files=()=>{

    const [isOpen,setIsOpen]=useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const files=useSelector((state:any)=>state.fileStore.files)

    // const createFileUrl = (file:any) => {
    //     return URL.createObjectURL(file);
    // };

    const deleteFile=async (fileName:any)=>{
        try{
            const response=await axios.delete(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?blobName=${fileName}`)
            //console.log(response.data)
        }catch(err){

        }
    }

    return(
        <>
        
        <div>
            {
                files.length===0?
                <EmptyView/>:
                (
                    <>
                    <FileSearcherBar/>
                    <ul className="row ps-0 m-5">

                    {files.map((eachFile:any)=>{
                    const extension=eachFile.name.split(".").pop();
                    const iconStyle = defaultStyles[extension as keyof typeof defaultStyles];
                        return(
                        <li key={eachFile.id} className="col-sm-6 col-md-4 col-xl-2 file-list-item mb-3">
                        <a 
                        className="file-item"
                        href={eachFile.url}
                        key={eachFile.name}
                        rel="noopener noreferrer"
                        target="_blank"
                        >
                            <div className="icon-style mb-2">
                                <FileIcon {...iconStyle} extension={extension} />
                            </div>
                                                      
                        </a>
                        <div className="name-container">
                            <p onClick={()=>{window.open(eachFile.url,'_blank')}} className="file-name pe-0 me-0">{eachFile.name}</p>
                            <MdDelete className="delete-icon m-0 p-0" onClick={openModal}/>
                            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                <h6 className="mb-4">Are you sure?</h6>
                                <div className="d-flex justify-content-center">
                                <button onClick={()=>deleteFile(eachFile.name)} className="btn btn-outline-danger px-5 me-2">Delete</button>    
                                <button onClick={closeModal} className='btn btn-danger px-5 ms-2'>
                                Close
                                </button>
                                </div>
                            </Modal>
                        </div>
                        </li>
                        )
                    })}
                    </ul>
                    </>
                )
            }
           

        </div>
        </>
    )
}