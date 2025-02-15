import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Add.css';
import Button from '../Component/Button';
import { Get } from '../Services/Api';
import { Put } from '../Services/Api';
import Input from '../Component/Input';
import Header from '../Component/Header';
import SideBar from '../Component/LeftBar';


function Edit() {

    const location = useLocation();
    const { id } = location.state || {}

    const navigate = useNavigate();
    const token=localStorage.getItem('token')

    const [answer, setanswer] = useState([])
    const [newAnswer, setnewAnswer] = useState([])
    const [desigData, setdesigData] = useState([])
    const [setsData, setsetsData] = useState([])
    const [setId, setsetId] = useState()
    const [desiId, setdesiId] = useState()

    const [questionDetail, setQuestionDetail] = useState({
        questionText: "",
        questionId: ""
    });
    const [DesigDetail, setDesigDetail] = useState({
        desigId: "",
        desigName: ""
    });
    const [SetDetail, setSetDetail] = useState({
        setId: "",
        setName: ""
    });


    const handleSetId = (e) => {
        setsetId(e.target.value)
    }


    const handledesiId = (e) => {
        setdesiId(e.target.value)
    }
    const handleQuestion = (e) => {
        const updateQuestion = { ...questionDetail };
        updateQuestion.questionText = e.target.value;
        setQuestionDetail(updateQuestion);
    };
    const handleAnswer = (e, index, ans_id) => {
        const updatedAnswers = [...answer];
        updatedAnswers[index].answerText = e.target.value;
        setanswer(updatedAnswers);

    }
    const handleSubmit = (event) => {
        event.preventDefault()
    }


    const selectDesignation = async () => {
        try {
            const response = await Get('designation',token);
            console.log("response")
            setdesigData(response.result_value)

        } catch (error) {
            console.log(error);
        }

    }

    const selectSets = async (id) => {
        try {
            const response = await Get(`set/${id}`,token);
            setsetsData(response.result_value)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        selectDesignation()
    }, [])



    const updateData = async () => {
        for(let i=0; i<answer.length; i++)
        {
            if(answer[i].answerText=='')
            {
                alert("Existed fields can't be empty")
                return;
            }
        }
       

        const response = await Put(`update/${id}`,{ questionDetail, answer, setId, desiId },token)
        console.log("response :",response)

        if(response.result >0 )
        {
            alert(response.message)
            navigate('/QuesAns')
        }
        else{
            alert(response.message)
        }
        
  
    }
    const editData = async () => {
        try {
            const responseValue = await Get(`edit/${id}`,token)
            if (responseValue.result > 0) {
                console.log('return ', responseValue.result_value);
                setQuestionDetail({
                    questionText: responseValue.result_value.question.questionText,
                    questionId: responseValue.result_value.question._id
                });
                setanswer(responseValue.result_value.answer);
                setDesigDetail({
                    desigId: responseValue.result_value._id,
                    desigName: responseValue.result_value.DesignationName.designationName

                });
                setSetDetail({
                    setId: responseValue.result_value._id,
                    setName: responseValue.result_value.setName.setName
                });
            }
            else {
                console.error('Error')
            }

        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        editData()
    }, [])



    return (
        <div>
            <div className="container">
                <Header />
                <div className="mainbar">
                    <SideBar />
                    <div className="main">
                        <div className='mainelement'>
                            <div>
                                <select className='select'
                                    value={desiId}
                                    onChange={(e) => {
                                        handledesiId(e);
                                        selectSets(e.target.value);
                                    }}
                                >
                                    <option value={DesigDetail.desigId} selected>{DesigDetail.desigName}</option>
                                    {desigData.map((designation) => (
                                        <option key={designation._id} value={designation._id}>
                                            {designation.designationName}</option>
                                    ))}
                                </select>

                                <select className='select'
                                    value={setId}
                                    onChange={handleSetId}

                                >
                                    <option value={SetDetail.setId} selected>{SetDetail.setName}</option>
                                    {setsData.map((sets) => (
                                        <option key={sets._id} value={sets._id}>
                                            {sets.setName}
                                        </option>
                                    ))}
                                </select>
                                <div className='formdata'>
                                    <label htmlFor='Question' >Question</label>

                                    <div className='formInput'>
                                        <Input
                                            className="inputStyle"
                                            onChange={(e) => handleQuestion(e, questionDetail.questionId)}
                                            value={questionDetail.questionText}
                                        />
                                    </div>


                                    {answer.map((ans, index) => (
                                        <div className='formInput'>
                                            <Input
                                                className="inputStyle"
                                                type='text'
                                                onChange={(e) => handleAnswer(e, index, ans._id)}
                                                value={ans.answerText}
                                            />

                                        </div>
                                    ))}

                                    <div className='stylebutton'>
                                        <Button onClick={updateData} className='button-Secondary' name='Update' />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Edit;
