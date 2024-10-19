
import { FolderItem } from "../folderItem"

import { useSelector } from "react-redux"

import './index.css'

export const Folders=()=>{
    const assignedCategories=useSelector((state:any)=>state.userStore.assignedCategories)
    //console.log(assignedCategories)

    const folders=useSelector((state:any)=>state.fileCategoryStore.fileCategories)
    const assignedFolders=folders.filter((category:any)=>assignedCategories.includes(category.categoryName))

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