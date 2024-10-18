
import { FolderItem } from "../folderItem"

import { useSelector } from "react-redux"

import './index.css'

export const Folders=()=>{
    const folders=useSelector((state:any)=>state.fileCategoryStore.fileCategories)

    return(
        <div className="folders-container">
            <ul className="p-4 d-flex flex-wrap">
            {
                folders.map((eachFolder:any)=>(
                    <FolderItem key={eachFolder.id} category={eachFolder}/>
                ))
            }
            </ul>
        </div>
    )
}