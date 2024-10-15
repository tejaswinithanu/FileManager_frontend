import { useSelector } from "react-redux"

export const Actions=({openActions}:any)=>{
    
    const actions=useSelector((state:any)=>state.fileCategoryStore.actions)

    return(
        <>
            {
                openActions && (
                    <div>
                        {
                            actions.map((eachAction:any)=>(
                                <label key={eachAction.id}>
                                    <input type="checkbox"/>
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