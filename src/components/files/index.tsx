import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"
import Modal from 'react-modal'
import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'
import { useEffect, useState } from "react";
import { deleteFile, fetchFilesByCategory, setFileDeleteStatus, setStatus } from "../../store/fileStore";
import { Loading } from "../loading";
import { useParams } from "react-router-dom";
import { setActiveCategory } from "../../store/fileCategoryStore";
import { ErrorView } from "../errorView";

Modal.setAppElement('#root')


const sortingFunctions:any={
    'default':null,
    'name':(a:any, b:any) => a.name.localeCompare(b.name),
    'date-asc': (a:any, b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    'date-desc': (a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
}

export const Files=()=>{

    const [isOpen,setIsOpen]=useState(false); 
    const [selectedFile,setSelectedFile]=useState("");
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const {files, status, error, deleteStatus, sortBy}=useSelector((state:any)=>state.fileStore)
    const [filesList,updateFilesList]=useState(files)

    const searchValue=useSelector((state:any)=>state.fileStore.filterValue)

    useEffect(() => {
        let updatedFiles = [...files];

        // Apply filtering if there is a search value
        if (searchValue) {
            updatedFiles = updatedFiles.filter((file:any) => 
                file.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Apply sorting if sortBy is specified
        if (sortBy !== 'default') {
            updatedFiles = updatedFiles.sort(sortingFunctions[sortBy]);
        }

        // Update the files list state
        updateFilesList(updatedFiles);
    }, [files, searchValue, sortBy]);


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
    },[dispatch])
 
    const handleDeleteFile=async ()=>{
        //dispatch(setFileDeleteStatus('loading'))
        const userDetails:any=sessionStorage.getItem('userDetails')
        const {email}=JSON.parse(userDetails)
        closeModal()
        dispatch(setStatus('loading'))
        await dispatch<any>(deleteFile({selectedFile,category}))
        
        dispatch<any>(fetchFilesByCategory(category))
    }

    // useEffect(() => {
    //     if (deleteStatus === "succeeded") {
    //       setShowDeleteSuccess(true);
    
    //       // Hide the popup after 3 seconds
    //       const timer = setTimeout(() => {
    //         setShowDeleteSuccess(false);
    //       }, 3000);
    
    //       // Cleanup timer on unmount
    //       return () => clearTimeout(timer);
    //     }
    //   }, [deleteStatus]);

    if (status==="loading") return <Loading/>

    if (status === 'failed') return <ErrorView errorMsg={error}/>

    if (status === 'succeeded' && files.length === 0) return <EmptyView reload={true} errorText="Oops😕, No files are added yet!"/>

    return(
        <div className="files-container">
            <FileSearcherBar/>
            {
                filesList.length!==0 ?             

                (         
                    <ul className="row m-4">

                    {filesList.map((eachFile:any)=>{
                        const extension=eachFile.name.split(".").pop();
                        const iconStyle = defaultStyles[extension as keyof typeof defaultStyles];
                        const {createdAt}=eachFile

                        const createdTime = `${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                        
                        return(
                        <li key={eachFile._id} className="col-sm-6 col-md-4 col-xl-2 file-list-item mb-3">
                            <a 
                            className="file-item"
                            href={eachFile.path}
                            rel="noopener noreferrer"
                            target="_blank"
                            >
                                <div className="icon-style mb-2">
                                    <FileIcon {...iconStyle} extension={extension} />
                                </div>
                                                        
                            </a>
                            <div className="action-container">
                                
                                <p onClick={()=>{window.open(eachFile.path,'_blank')}} className="file-name pe-0 me-0">{eachFile.name}</p>       
                                  
                                <p className="created-time-text">Created At: <span className="created-time">{createdTime}</span></p>                      
                                
                                <MdDelete size={18} className="delete-icon" onClick={()=>openModal(eachFile.name)}/>
                               
                                <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                    <h6 className="mb-4">Are you sure?</h6>
                                    <div className="d-flex justify-content-center">
                                    <button onClick={()=>handleDeleteFile()} className="btn btn-outline-danger px-5 me-2">Delete</button>    

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
                    
                   
                ):
                <EmptyView reload={false} errorText="Oops😕, No files with that name!"/>
                
            }

            {/* Delete Success Popup */}
            {/* {showDeleteSuccess && (
                <div className="popup-container">
                <div className="popup-content">
                    <p>File Deleted Successfully!</p>
                </div>
                </div>
            )} */}
           

        </div>
    )
}