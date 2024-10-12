import axios from 'axios'
import { useEffect } from 'react';

const LoadingRunway=()=>{

    useEffect(()=>{
        const getUser=async()=>{
           try {const params=new URLSearchParams(window.location.search);
            const code=params.get('code')
            console.log(code)
            const res=await axios.post(`http://10.0.0.171:4000/auth/callback`,{code})
           
            console.log(res.data)
            localStorage.setItem("access_token",res.data.mail)
        
            window.location.href='/home'
            }
            catch(err){
                console.log(err)
            }
        }
        getUser()
    })

    return(
        <div>
            Loading...
        </div>
    )
}

export default LoadingRunway