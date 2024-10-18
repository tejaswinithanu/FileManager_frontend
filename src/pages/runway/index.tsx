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
            const res=await axios.post(`https://testsamplefnexp.azurewebsites.net/api/AuthFunctions?code=${code}`)
           
            console.log(res.data)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem('mail',res.data.userDetails.mail)
            localStorage.setItem('username',res.data.userDetails.displayName)
        
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