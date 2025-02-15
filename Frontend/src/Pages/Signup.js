import './Signup.css'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Input from '../Component/Input'
import Button from '../Component/Button'
import { Post } from '../Services/Api'
import SignupValidation from './Validation/SignupValidation'

function Signup() {

     console.log("Component re-render")
    const [values, setvalues] = useState({

        FirstName: "",
        LastName: "",
        MobileNumber: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    })
   
    const[error,seterror]=useState({})
    const navigate = useNavigate();

    const handleInputs = (event) => {
        const newObj = { ...values, [event.target.name]: event.target.value }
        setvalues(newObj)
    }


    const SignUp = async () => {  
        try {
      const validationError= SignupValidation(values)
      console.log("Errors :" ,validationError)
      seterror(validationError)

      if(validationError.FirstName || validationError.LastName || validationError.Email || validationError.MobileNumber || validationError.Password || validationError.ConfirmPassword)
      {
        return;
      }
      if(values.Password !== values.ConfirmPassword){
          return;
      } 
       const userData = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        MobileNumber: values.MobileNumber,
        Email: values.Email,
        Password: values.Password,
        ConfirmPassword:values.ConfirmPassword
    }
        
            const data=await Post('auth/signup',userData)
          
            if(data.result>0)
            {
                alert(data.message);
                navigate("/Login")
            }
            else{
                alert(data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className='form'>
                <div className="signupcontainer">
                    <div className="inputs">
                        <div className="element">
                            <p>FirstName</p>
                            <Input name="FirstName" className="inputStyle" type='text' onChange={handleInputs} placeholder='Enter your First Name'/>
                            {error.FirstName && <p className='error'>{error.FirstName}</p>}

                        </div>
                        <div className="element">
                            <p>LastName</p>
                            <Input name='LastName' className="inputStyle" type='text' onChange={handleInputs} placeholder='Enter Your Last Name' />


                            {error.LastName && <p className='error'>{error.LastName}</p>}
                        </div>

                        <div className="element">
                            <p>Mobile Number</p>
                            <Input name='MobileNumber' className="inputStyle" type='number' onChange={handleInputs} placeholder='Enter Your Mobile Number' />
                            {error.MobileNumber && <p className='error'>{error.MobileNumber}</p>}
                             
                        </div>
                        <div className="element">
                            <p>Email</p>
                            <Input name='Email'  className="inputStyle" type='email' onChange={handleInputs} placeholder='Enter Your Email' />
                            {error.Email && <p className='error'>{error.Email}</p>}
                        </div>

                        <div className="element">
                            <p>Password</p>
                            <Input name='Password' className="inputStyle" type='password' onChange={handleInputs} placeholder='Enter Your Password' />
                            {error.Password && <p className='error'>{error.Password}</p>}
                        </div>
                        <div className="element">
                            <p>Confirm Password</p>
                            <Input name='ConfirmPassword' className="inputStyle" type='password' onChange={handleInputs} placeholder='Confirm Password' />
                            {error.ConfirmPassword && <p className='error'>{error.ConfirmPassword}</p>}
                        </div>



                        <div className='stylebutton'>   
                            <Button className='button-primary' onClick={SignUp} name='Signup'/>
                            <Button  className='button-Secondary' onClick={()=>navigate('/login')} name='Login' />
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Signup;