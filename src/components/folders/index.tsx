
import { FolderItem } from "../folderItem"

import { useSelector } from "react-redux"

import './index.css'

export const Folders=()=>{
    const userDetails:any=localStorage.getItem('userDetails');
    //console.log(userDetails)
    const folders=useSelector((state:any)=>state.fileCategoryStore.fileCategories)
    const {assignedCategories}=JSON.parse(userDetails)  
    //console.log('assignedCategories',assignedCategories)

    
    const assignedFolders=folders.filter((category:any)=>assignedCategories.includes(category.value))

    return(
        <div className="folders-container">
            <ul className="p-4 d-flex flex-wrap">
            {
                assignedFolders.map((eachFolder:any)=>(
                    <FolderItem key={eachFolder.id} category={eachFolder}/>
                ))
            }
            </ul>
        </div>
    )
}