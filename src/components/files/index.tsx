import { useSelector } from "react-redux"
import { FileSearcherBar} from "../fileSearcherBar"
import { EmptyView } from "../emptyView"

import  {FileIcon,defaultStyles}  from 'react-file-icon';

import './index.css'

export const Files=()=>{

    const files=useSelector((state:any)=>state.fileStore.files)

    const createFileUrl = (file:any) => {
        return URL.createObjectURL(file);
      };

    return(
        <>
        <FileSearcherBar/>
        <div>
            {
                files.length===0?
                <EmptyView/>:
                (
                    <ul className="row ps-0 m-5">

                    {files.map((eachFile:any)=>{
                    const extension=eachFile.name.split(".").pop();
                    const iconStyle = defaultStyles[extension as keyof typeof defaultStyles];
                        return(
                        <li className="col-sm-6 col-md-4 col-xl-2 file-list-item mb-3">
                        <a 
                        className="file-item"
                        href={createFileUrl(eachFile.fileObject)}
                        key={eachFile.name}
                        rel="noopener noreferrer"
                        target="_blank"
                        >
                            <div className="icon-style mb-2">
                                <FileIcon {...iconStyle} extension={extension} />
                            </div>
                            <input className="file-name pe-0 me-0" value={eachFile.name}/>                          
                        </a>
                        </li>
                        )
                    })}
                    </ul>
                )
            }
           

        </div>
        </>
    )
}