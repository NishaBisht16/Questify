import './Home.css'
import { useEffect, useState } from "react";
import Header from "../Component/Header";
import SideBar from "../Component/LeftBar";



function HomeScreen() {
    const [highlight, sethighlight] = useState(false)

    useEffect(() => {
        sethighlight(true)
    }, [])
  


    return (
        <div>
            <div className="container">
                <Header />
                <div className="mainbar">
                    <SideBar/>
                    <div className="main">
                        <div className="mainelement">
                            <h1>Welcome</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeScreen;