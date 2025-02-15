import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Add.css';
import Button from '../Component/Button';
import { Get } from '../Services/Api';
import { Post } from '../Services/Api';
import Input from '../Component/Input';
import Header from '../Component/Header';
import SideBar from '../Component/LeftBar';
import plus from '../images/plus.svg';
import delete2 from '../images/delete2.svg'

function Add() {
    const navigate = useNavigate();
    const token=localStorage.getItem('token')


    const [answer, setanswer] = useState([])
    const [question, setquestion] = useState()
    const [count, setcount] = useState(1)
    const [desigData, setdesigData] = useState([])
    const [setsData, setsetsData] = useState([])
    const [setId, setsetId] = useState()
    const [desiId, setdesiId] = useState()



    const handleSetId = (e) => {
        setsetId(e.target.value)
    }

    const handledesiId = (e) => {
        setdesiId(e.target.value)
    }
    const handleCount = () => {
        setcount(count + 1)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
    }


    const create = []
    const removeinput = () => {
        setcount(count - 1)
    }

    const handleInputChange = (i, value) => {

        const updatedAnswers = [...answer];
        updatedAnswers[i] = value;




        setanswer(updatedAnswers);
    }

    for (let i = 0; i < count; i++) {

        create.push(
            <div style={{ marginTop: "20px" }} key={i} className='answer'>

                <Input type='text'
                    onChange={(e) => handleInputChange(i, e.target.value)} className="inputStyle" />
                <img width="30px" height="30px" src={delete2} onClick={removeinput} />
            </div>
        )
    }



    const selectDesignation = async () => {
        try {
            
            const response = await Get('designation',token);
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


    const sendData = async () => {
        try {
            debugger;
            if (!question || !answer || !setId || !desiId) {
                alert("All field should be selected ")
                return;
            }
            if (count !== answer.length) {
                return alert("Fill all the required fields")
            }
             console.log("token:",token)
            const data = await Post('questionAnswer', { question, answer, setId, desiId},token)
            console.log("data",data.result)
            if (data.result > 0) {
                alert(data.message)
                navigate('/QUesAns')
            }
            else{
                alert(data.error_message)
            }
            
        }

        catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className="container">
                <Header />
                <div className="mainbar">
                    <SideBar />
                    <div className="main">
                        <div className='mainelement'>
                            <div>
                                <select
                                    value={desiId}

                                    onChange={(e) => {
                                        handledesiId(e);
                                        selectSets(e.target.value);
                                    }}

                                >
                                    <option value="" disabled selected>Select designation</option>
                                    {desigData.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.designationName}</option>
                                    ))}
                                </select>


                                {desiId ?
                                    <select
                                        value={setId}
                                        onChange={handleSetId}
                                    >
                                        <option value="" selected disabled >Select set</option>
                                        {setsData.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.setName}
                                            </option>
                                        ))}
                                    </select> :
                                    null

                                }
                                <div className='formdata'>
                                    <label htmlFor='Question'>Question</label>

                                    <div className='formInput'>
                                        <Input
                                            className="inputStyle"
                                            type='text'
                                            onChange={(e) => setquestion(e.target.value)}
                                            value={question}
                                        />
                                    </div>
                                    <div className='answer'>
                                        <label htmlFor='Answer'>Answer</label>
                                        <img src={plus} height="30px" width="30px" onClick={handleCount} />
                                    </div>
                                    <div >
                                        {create}
                                    </div>
                                    <div className='stylebutton'>
                                        <Button className='button-primary' name='Save' onClick={sendData} />
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

export default Add;
