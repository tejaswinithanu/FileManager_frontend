import {v4 as uuidv4} from 'uuid'
export class FileCategories{
    fileCategories: any[];
    actions:any[];
    constructor(){
        this.fileCategories=[
            {
                id:uuidv4(),
                categoryName:'Human Resources',
                value:'human_resources'
            },
            {
                id:uuidv4(),
                categoryName:'Software development',
                value:'software_development'
            },
            {
                id:uuidv4(),
                categoryName:'Financial files',
                value:'financial_files'
            },
            {
                id:uuidv4(),
                categoryName:'Legal and Compliance',
                value:'legal_and_compliance'
            },
            {
                id:uuidv4(),
                categoryName:"Project Files",
                value:'project_files'
            }
        ]
        this.actions=[
            {
                id:uuidv4(),
                action:"upload"
            },
            {
                id:uuidv4(),
                action:"view"
            },
            {
                id:uuidv4(),
                action:"update"
            },
            {
                id:uuidv4(),
                action:"delete"
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