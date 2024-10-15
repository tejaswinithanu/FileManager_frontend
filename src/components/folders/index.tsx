import { EmptyView } from "../emptyView"
import { FolderItem } from "../folderItem"
import { FileSearcherBar} from "../fileSearcherBar"

export const Folders=()=>{
    return(
        <>
        <FileSearcherBar/>
        <div>
            <EmptyView/>
        </div>
        </>
    )
}