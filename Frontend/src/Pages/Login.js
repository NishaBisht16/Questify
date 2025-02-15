
import { useEffect, useState } from "react"
import './Login.css'
import { useAuth } from "../Store/auth"
import { matchRoutes, useNavigate } from "react-router-dom"
import Button from "../Component/Button"
import { Post } from "../Services/Api"
import user from '../images/user.svg';
import lock from '../images/lock.svg'

import LoginValidation from "./Validation/LoginValidation"

function Login() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Emailerror, setEmailerror]=useState()
    const [Passworderror,setPassworderror]=useState()

    const navigate = useNavigate();


    const { loginUser } = useAuth();
    const {authorizedUser}=useAuth();

    const handleInputs = (event) => {
        const value = event.target.value
        setEmail(value)
    }
    const handlePass = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }
   
    const login = async () => {
        
        try{
              
            const validationErrors = LoginValidation({ Email, Password });
            setEmailerror(validationErrors.Email || "");
            setPassworderror(validationErrors.Password || "");
    
           
            if (validationErrors.Email || validationErrors.Password) {
                return; 
            }
              
            const data=await Post('auth/login',{Email,Password})  
            if(data.result > 0){
                const token = data.result_value.token
                console.log("User:",data.result_value.user)
                loginUser(token);
                alert("Login successfull..");
                authorizedUser(data.result_value.user)
                
            }
            else{
                setEmailerror(data.Email_error)
                setPassworderror(data.Password_error)
            }
        }
        catch(error)
        {
            console.log("Error",error)
        }
    }

    return (
        <div style={{ height:"100vh"}}>
            <div className="form">
                <div className="container">
                    <div className="loginform">
                        
                        <p style={{textAlign:"center", fontSize:'30px', fontWeight:"bold"}}>Login Form</p>
                        <div className="element2">
                            <img  height="30px" width="30px" src={user} alt="user" />

                            <input type='email' onChange={handleInputs} placeholder='Enter Your Email' className="input2" />
                             {Emailerror && <p className='error'>{Emailerror}</p>}
                        </div>

                        <div className="element2" id="element"> 
                           <img height="30px" width="30px" src={lock} alt="lock" ></img> 
                            <input type='password' onChange={handlePass} placeholder='Enter Your Password' className="input2" />
                            {Passworderror && <p className="error">{Passworderror}</p>}

                        </div>

                        <div>
                           <div className="stylebutton">
                            <Button className='button-Secondary' onClick={login} name='Login' style={{marginTop:"30px"}}  />
                           </div>
                        
                        </div>

                        <div className="login-txt">
                            <a href="/">Don't have an Account Create new Account, Signup</a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;