import { Outlet} from "react-router-dom"
import { Header } from "../../components/header"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { fetchUsers } from "../../store/userStore"


const Home=()=>{

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch<any>(fetchUsers())
    },[dispatch])
    return(
        <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}

export default Home