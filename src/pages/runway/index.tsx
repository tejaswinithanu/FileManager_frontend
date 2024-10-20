import axios from 'axios'
import { useEffect } from 'react';

import './index.css'
import { Loading } from '../../components/loading';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoadingRunway=()=>{

    const navigate=useNavigate();

    useEffect(()=>{
        const getUser=async()=>{
           try {const params=new URLSearchParams(window.location.search);
            const code=params.get('code')
            console.log(code)
            const res=await axios.post(`https://testsamplefnexp.azurewebsites.net/api/AuthFunctions?code=${code}`)
           
            const data=res.data
        
            //console.log(res.data)
            localStorage.setItem("token",data.token)

            const userDetails={
                email:data.userDetails.mail,
                username:data.userDetails.displayName,
                role:data.userDetails.role,
                assignedCategories:data.userDetails.categories
            }

            localStorage.setItem('userDetails',JSON.stringify(userDetails))

            //dispatch(addUserDetails(userDetails))
            
            //window.location.href='/'
            navigate('/')
            
        
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