import { useState, useEffect } from 'react';
import './QuestionAnswer.css'
import { useNavigate } from 'react-router-dom';
import Button from '../Component/Button';
import { Get } from '../Services/Api';
import { Delete } from '../Services/Api';
import Header from '../Component/Header';
import SideBar from '../Component/LeftBar';
import MyModal from '../Component/Modal'

function QuesAns() {
    const [Show,setShow]=useState(false)
    const [CurrentId,setCurrentId]=useState('')
    const token = localStorage.getItem('token');
    
    const handleClick=(id)=>{
        setCurrentId(id)
        setShow(true)
    }
        
     const closeModel=()=>
        {
            setShow(false)
            getQuestionAnswer();
           
        }

    
    const [data, setdata] = useState([])
   


    const getQuestionAnswer = async () => {
        try {
              debugger;
            const response = await Get('getquestionAnswer',token)

            if(response.length==0)
            {
               setdata([])
            }
            else{
                setdata(response) 
            }
        }
        catch (error) {
            console.log("Error :", error)
        }
    }

    useEffect(() => {
        getQuestionAnswer();
    }, [])

    const deleteData=async({id})=>{
        try{
            console.log("Token :",token)
            const response=await Delete(`delete/${id}`,token)
        }
        catch(error)
        {
            console.log(error)
        }
      }

      
    const navigate = useNavigate()
    return (
        <div>
            <div className="container">
                <Header />
                <div className="mainbar">
                    <SideBar/>
                    <div className="main">
                    <Button onClick={()=>navigate('/Add')} className='button-Secondary' name='Add Question-Answer' style={{marginTop:"30px" ,marginLeft:"20px"}} />

                        <div className="mainelement">
                            <div className='boxContainer'>
                            {
                               data && data.map((item) => (
                                    <div className='box'>
                                        <div className='boxele'>
                                            <p>{item.designationname.designationName}</p>
                                            <p>{item.setname.setName}</p>
                                        </div>
                                        <p style={{ paddingLeft: "60px" }}>{item.question.questionText}</p>
                                        {item.answerArray.map((ans) => (
                                            <li style={{ paddingLeft: "60px", paddingTop:"10px" }}>{ans.answerText}</li>
                                        ))}

                                        <div className='boxele' >
                                        <button className='button2' onClick={() => navigate('/Edit', { state: { id: item.id } })}>Edit</button>
                                        <button className='button2' onClick={()=>{
                                             handleClick(item.id)
                                        }}>Delete</button>
                                        {Show && <MyModal closeModel={closeModel} deleteData={deleteData} itemId={CurrentId} getQuestionAnswer={getQuestionAnswer}/>}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuesAns;