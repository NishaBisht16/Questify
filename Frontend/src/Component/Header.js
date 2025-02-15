import './Header.css'
import { useAuth } from '../Store/auth';
function Header(){
    const { logoutUser } = useAuth();
    return(
        
            <div classsName="headerContainer">
               <div className="header">
                <h3></h3>
                <button id="btn2" onClick={logoutUser} >Logout</button>
            </div> 
            </div>
    )
}
export default Header;