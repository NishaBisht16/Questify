import './LeftBar.css'
import { useState,useEffect } from 'react';
import dashboard from '../images/dashboard.svg';
import Question from '../images/Question.svg';
import Employee from '../images/Employee.svg'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Store/auth';

function  SideBar()
{
   const {loggedInuser}=useAuth();
    const location=useLocation()

    const [highlight,sethighlight]=useState(false)
    const [highlight2,sethighlight2]=useState(false)

    useEffect(() => {
        if(location.pathname=='/QUesAns')
        {
            sethighlight2(true)
        }
        if(location.pathname=='/Dashboard')
        {
            sethighlight(true)
        }
        console.log("courrent route :",location.pathname)
    }, [location])

    return(
            <div className="leftbar">
                
                 <div className="leftelement">
                    <div className='user sidebar-inner'>
                        <img height='40px' width='40px' src={Employee}/>
                        <p>{loggedInuser.FirstName}</p>
                        <p>{loggedInuser.LastName}</p>
                    </div>
                        <div id={highlight ? 'highlight' : ''}  className='sidebar-inner' >
                                <img height="30px" width ="30px"src={dashboard} alt="dashbord icon"/>
                                 <a  href='/Dashboard'>Dashbord</a>
                        </div>
                          
                        <div id={highlight2 ? 'highlight2' : ''} className="sidebar-inner" >
                            <img height="30px" width ="30px"src={Question} alt="Question icon"/>
                             <a  href="/QUesAns">QuestionAnswer</a>

                        </div>
                    </div>
                    
            </div>

    )


}

export default SideBar;