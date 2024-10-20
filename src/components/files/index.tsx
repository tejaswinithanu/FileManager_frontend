import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"
import Modal from 'react-modal'
import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchFilesByCategory } from "../../store/fileStore";
import { Loading } from "../loading";
import { useParams } from "react-router-dom";
import { setActiveCategory } from "../../store/fileCategoryStore";

Modal.setAppElement('#root')



export const Files=()=>{

    const [isOpen,setIsOpen]=useState(false); 
    const [selectedFile,setSelectedFile]=useState("");
    
    const [isDeletePopupOpen,setDeletePopup]=useState(false);
    const {files, status, error}=useSelector((state:any)=>state.fileStore)

    const searchValue=useSelector((state:any)=>state.fileStore.filterValue)

    const filteredFiles=files.filter((file:any)=>{
        const lowercaseName=file.name.toLowerCase()
        return lowercaseName.includes(searchValue.toLowerCase())
    })

    const {category}=useParams()

    const openModal = (fileName:any) => {
        setSelectedFile(fileName)
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setActiveCategory(category))
        dispatch<any>(fetchFilesByCategory(category))
        console.log(typeof files)
    },[dispatch])

    const deleteFile=async ()=>{
        const userMail=localStorage.getItem('mail')
        console.log('userMail',userMail)
        console.log('fileName',selectedFile)
        try{
            const response=await axios.delete(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?blobName=${selectedFile}&userMail=${userMail}`)
            //console.log(response.data)
            if(response.status===200){
                closeModal()
                setDeletePopup(true)
                dispatch<any>(fetchFilesByCategory(category))
                
            }
        }catch(err:any){
            console.log(err.response.data)
        }
        
        
    }

    if (status==="loading") return <Loading/>

    if (status === 'failed') return <div>Error: {error}</div>;

    if (status === 'succeeded' && files.length === 0) return <EmptyView/>

    return(
        <div>
            {
                files.length!==0 &&
                // <EmptyView/>:
                (
                    <>
                    <FileSearcherBar/>
                    <ul className="row ps-0 m-5">

                    {filteredFiles.map((eachFile:any)=>{
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
                                    <MdDelete className="delete-icon" onClick={()=>openModal(eachFile.name)}/>
                                </div>
                                <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                    <h6 className="mb-4">Are you sure?</h6>
                                    <div className="d-flex justify-content-center">
                                    <button onClick={()=>deleteFile()} className="btn btn-outline-danger px-5 me-2">Delete</button>    

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
                            <Modal isOpen={isOpen} onRequestClose={()=>setDeletePopup(false)} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                <div>File deleted Successfully</div>
                            </Modal>        
                    )}
                    </>
                )
            }
           

        </div>
    )
}