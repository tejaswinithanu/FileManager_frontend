import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"
import Modal from 'react-modal'
import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'
import { useEffect, useState } from "react";
import { deleteFile, fetchFilesByCategory, setStatus } from "../../store/fileStore";
import { Loading } from "../loading";
import { useParams } from "react-router-dom";
import { setActiveCategory } from "../../store/fileCategoryStore";

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
    
    const [isDeletePopupOpen,setDeletePopup]=useState(false);
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
        if (sortBy !== '' && sortBy !== 'default') {
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
        console.log('activeCategory',category)
        dispatch<any>(fetchFilesByCategory(category))
        console.log(typeof files)
    },[dispatch])

    const handleDeleteFile=async ()=>{
        const userDetails:any=localStorage.getItem('userDetails')
        const {email}=JSON.parse(userDetails)
        closeModal()
        dispatch(setStatus('loading'))
        await dispatch<any>(deleteFile({selectedFile,userMail:email}))
        
        dispatch<any>(fetchFilesByCategory(category))
        // try{
        //     const response=await axios.delete(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?blobName=${selectedFile}&userMail=${email}`)
        //     //console.log(response.data)
        //     if(response.status===200){
        //         closeModal()
        //         
        //         dispatch<any>(fetchFilesByCategory(category))
                
        //     }
        // }catch(err:any){
        //     console.log(err.response.data)
        // }    
        
    }

    if (status==="loading") return <Loading/>

    if (status === 'failed') return <div>Error: {error}</div>;

    if (status === 'succeeded' && files.length === 0) return <EmptyView/>

    return(
        <div>
            {

   

                files.length!==0 &&
              

                (
                    <div className="files-container">
                    <FileSearcherBar/>

                    
                    <ul className="row m-4">

                    {filesList.map((eachFile:any)=>{
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
                    {isDeletePopupOpen && (
                            <Modal isOpen={isOpen} onRequestClose={()=>setDeletePopup(false)} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                <div>File deleted Successfully</div>
                            </Modal>        
                    )}
                    </div>
                )
            }
           

        </div>
    )
}