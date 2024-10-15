import { Outlet} from "react-router-dom"
import { Header } from "../../components/header"


const Home=()=>{
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