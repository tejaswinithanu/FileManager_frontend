import { useState } from "react"
import { useSelector } from "react-redux"

export const Actions=({openActions}:any)=>{

    const [selectedActions,setSelectedActions]=useState<string[]>([])
    
    const actions=useSelector((state:any)=>state.fileCategoryStore.actions)

    const isSelected=(option:string)=>selectedActions.includes(option)

    const handleCheckboxChange = (optionValue: string) => {
        setSelectedActions((prevSelected) =>
          prevSelected.includes(optionValue)
            ? prevSelected.filter((value) => value !== optionValue)
            : [...prevSelected, optionValue]
        );
      };

    return(
        <>
            {
                openActions && (
                    <div className="p-3">
                        {
                            actions.map((eachAction:any)=>(
                                <label className="me-3 cursor-pointer" key={eachAction.id}>
                                    <input className="me-2" onChange={()=>handleCheckboxChange(eachAction.id)} checked={isSelected(eachAction.id)} type="checkbox"/>
                                    {eachAction.action}
                                </label>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}