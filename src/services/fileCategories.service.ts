import {v4 as uuidv4} from 'uuid'
export class FileCategories{
    fileCategories: any[];
    actions:any[];
    constructor(){
        this.fileCategories=[
            {
                id:uuidv4(),
                categoryName:'Human Resources'
            },
            {
                id:uuidv4(),
                categoryName:'Software development'
            },
            {
                id:uuidv4(),
                categoryName:'Financial files'
            },
            {
                id:uuidv4(),
                categoryName:'Legal and Compliance'
            },
            {
                id:uuidv4(),
                categoryName:"Project Files"
            }
        ]
        this.actions=[
            {
                id:uuidv4(),
                action:"Upload"
            },
            {
                id:uuidv4(),
                action:"View"
            },
            {
                id:uuidv4(),
                action:"Update"
            },
            {
                id:uuidv4(),
                action:"Delete"
            }
        ]
    }

    getAllFileCategories=()=>{
        return this.fileCategories;
    }

    getActions=()=>{
        return this.actions;
    }
}