import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"
import Modal from 'react-modal'
import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchFiles } from "../../store/fileStore";
import { Loading } from "../loading";

Modal.setAppElement('#root')



export const Files=()=>{

    const [isOpen,setIsOpen]=useState(false); 
    
    const [isDeletePopupOpen,setDeletePopup]=useState(false);
    const files=useSelector((state:any)=>state.fileStore.files)
    const isLoading=useSelector((state:any)=>state.fileStore.loading)


    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch<any>(fetchFiles())
        console.log(typeof files)
    },[])

    
    // const createFileUrl = (file:any) => {
    //     return URL.createObjectURL(file);
    // };

    const deleteFile=async (fileName:any)=>{
        const userMail=localStorage.getItem('mail')
        console.log('userMail',userMail)
        try{
            const response=await axios.delete(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?blobName=${fileName}&userMail=${userMail}`)
            //console.log(response.data)
            if(response.status===200){
                closeModal()
                setDeletePopup(true)

                setTimeout(() => setDeletePopup(false), 2000);
                
                
            }
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
                    {isLoading && <Loading/>}
                    <ul className="row ps-0 m-5">

                    {files.map((eachFile:any)=>{
                    const extension=eachFile.name.split(".").pop();
                    const iconStyle = defaultStyles[extension as keyof typeof defaultStyles];
                        return(
                        <li key={eachFile._id} className="col-sm-6 col-md-4 col-xl-2 file-list-item mb-3">
                            <a 
                            className="file-item"
                            href={eachFile.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            >
                                <div className="icon-style mb-2">
                                    <FileIcon {...iconStyle} extension={extension} />
                                </div>
                                                        
                            </a>
                            <div className="name-container">
                                <div className="deleteee">
                                    <p onClick={()=>{window.open(eachFile.url,'_blank')}} className="file-name pe-0 me-0">{eachFile.name}</p>                                
                                    <MdDelete className="delete-icon" onClick={openModal}/>
                                </div>
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
                    {isDeletePopupOpen && (
                                    <div className="popup-container">
                                    <div className="popup-content">File deleted successfully!</div>
                                    </div>
                    )}
                    </>
                )
            }
           

        </div>
        </>
    )
}