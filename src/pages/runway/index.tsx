import axios from 'axios'
import { useEffect } from 'react';

import './index.css'
import { Loading } from '../../components/loading';

const LoadingRunway=()=>{

    useEffect(()=>{
        const getUser=async()=>{
           try {const params=new URLSearchParams(window.location.search);
            const code=params.get('code')
            console.log(code)
            const res=await axios.post(`https://testsamplefnexp.azurewebsites.net/api/authfunctions?code=${code}`)
           
            const data=res.data
        
            sessionStorage.setItem("token",data.token)

            const userDetails={
                email:data.userDetails.mail,
                username:data.userDetails.displayName,
                role:data.userDetails.role,
                assignedCategories:data.userDetails.categories
            }

            sessionStorage.setItem('userDetails',JSON.stringify(userDetails))
            
            window.location.href='/'
            
            
        
            }
            catch(err){
                console.log(err)
            }
        }
        getUser()
    })

    return(
        <Loading/>
    )
}

export default LoadingRunway