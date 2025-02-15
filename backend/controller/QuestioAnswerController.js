const Answers=require('../models/answerModel')
const questions=require('../models/questionModel')
const QuestionsAnswers=require('../models/questionAnswerModel')
const QuestionSets=require('../models/questionSetModel')
const designation=require('../models/designationModel')
const set=require('../models/setModel')
const mongoose=require('mongoose')
const userDetails=require('../models/userModel')
const jwt=require('jsonwebtoken')


const insertQuestionAnswers = async (req, res) => {
    debugger
    let session = await mongoose.startSession();
    try {
        session.startTransaction()
        // const loggedInUser=await userDetails.findOne({Email:"nisha@gmail.com"}).session(session)
        // console.log("LoggedIn User :",loggedInUser)

        const usertoken= req.headers['authorization']
        const token = usertoken.split(' ')[1];
        const decoded = jwt.decode(token);
          console.log( "decode",decoded.Email);
          const LoggedInUser=await userDetails.findOne({Email:decoded.Email})
          console.log("LoggedIN User :",LoggedInUser)
           console.log("LoggedIn user Id :",LoggedInUser._id)

    
        const user = LoggedInUser._id
        let date = new Date();
        let istDate = date.toLocaleString('en-IN');

        const { answer, question, setId, desiId } = req.body;


        if (question !== "") {  
            const newQuestion = new questions({
                questionText: question,
                createdBy: user,
                createdAt: istDate,
                modifyBy: null,
                modifyAt: null
            })


            await newQuestion.save({ session });
        }
        if (answer.length > 0) {
            const newAnswer = answer.map(item => ({
                answerText: item,
                createdBy: user,
                modifyBy: null,
                createdAt: istDate,
                modifyAt: null
            }));

            await Answers.insertMany(newAnswer, { session });
        }



        if (question !== "" && answer !== "") {
            await insertQuestionAndAnswerId(user, answer, setId, desiId, session)
        }


        await session.commitTransaction();

        res.send({
            result: 1,
            message: "Question and answers saved successfully."
        });


    }
    catch (error) {
        await session.abortTransaction();
        res.status(500).send({
            result: 0,
            error_message: "An error occurred while saving the question and answer."
        });
    }

    finally {
        session.endSession()
    }
}



const insertQuestionAndAnswerId = async (user, answer, setId, desiId, session) => {
    try {
        debugger;
        const getQuestion = await questions.find().sort({ createdAt: -1 }).limit(1).session(session);
        let quesId;
        if (getQuestion.length > 0) {
            quesId = getQuestion[0]._id;
            let answerId = [];
            for (let i = 0; i < answer.length; i++) {
                const AnswerData = await Answers.find().sort({ createdAt: -1 }).session(session);
                const ansId = AnswerData[i]._id;
                answerId.push(ansId);
            }

            const newQuestionAnswer = new QuestionsAnswers({
                quesId: quesId,
                ansId: answerId,
                createdBy: user,
                modifyBy: null,
                modifyAt: null,
            });

            await newQuestionAnswer.save({ session });

        } else {
            console.log("No questions found in the database.");
        }

        const questionAnswer = await QuestionsAnswers.findOne({ quesId: quesId }).session(session);
        const questionAnswerId = questionAnswer._id


        const saveQuestionSet = new QuestionSets({
            QuestiAnswerId: questionAnswerId,
            setId: setId,
            desId: desiId,
            createdBy: user,
            modifyBy: null,
            modifyAt: null
        });

        await saveQuestionSet.save({ session });

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


const getQuestionAnswer = async (req, res) => {
    try {
        debugger;
        const usertoken= req.headers['authorization']
        const token = usertoken.split(' ')[1];
        const decoded = jwt.decode(token);
        // console.log( "decode",decoded.Email);
        const LoggedInUser=await userDetails.findOne({Email:decoded.Email})


        const resultArray = [];
        const data = await QuestionSets.find();
        for (let i = 0; i < data.length; i++) {
        const id = data[i].QuestiAnswerId

          if(LoggedInUser._id.toString()==data[i].createdBy.toString())
          {
          
            const designationname = await designation.findById({ _id: data[i].desId })
            const setname = await set.findById({ _id: data[i].setId })
            const QuestionAnswerData = await QuestionsAnswers.findById(id)
            const question = await questions.findById({ _id: QuestionAnswerData.quesId })
            const answerArray = []
            for (let j = 0; j < QuestionAnswerData.ansId.length; j++) {
                const Answer = await Answers.findById({ _id: QuestionAnswerData.ansId[j] })
                answerArray.push(Answer)
            }

            resultArray.push({
                designationname,
                setname,
                question,
                answerArray,
                id
            }) 
        }
          }
          res.send(resultArray)
    }
    
    catch (error) {
        console.log(error)
    }
}



const editData = async (req, res) => {
    try {
        
        const { questionanswerId } = req.params;
         debugger;
        const data = await QuestionSets.find({ QuestiAnswerId: new mongoose.Types.ObjectId(questionanswerId) })

        const designationName = await designation.findById({ _id: data[0].desId })

        const setname = await set.findById({ _id: data[0].setId })
        const AnswerArray = []

        const QuestionAnswerData = await QuestionsAnswers.findById({ _id: new mongoose.Types.ObjectId(questionanswerId) })

        const question = await questions.findById({ _id: QuestionAnswerData.quesId })

        for (let i = 0; i < QuestionAnswerData.ansId.length; i++) {
            const Answer = await Answers.findById({ _id: QuestionAnswerData.ansId[i] })
            AnswerArray.push(Answer)
        }

        res.send({
            result: 1,
            result_value: {
                DesignationName: designationName,
                setName: setname,
                question: question,
                answer: AnswerArray
            }
        });
    }

    catch (error) {
        res.send({
            result: 0,
            error_message: error
        })
    }
}

const updateData = async (req, res) => {
    debugger
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { questionanswerId } = req.params;
        const { desiId, setId, questionDetail, answer} = req.body;
       
      
        const quesId = questionDetail.questionId;
      

        const updatesetdesId = await QuestionSets.findOneAndUpdate(
            { QuestiAnswerId: new mongoose.Types.ObjectId(questionanswerId) },
            { desId: desiId, setId: setId },
            { new: true }
        ).session(session);

    
        const updateQuestion = await questions.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(quesId) },
            { questionText: questionDetail.questionText },
            { new: true }
        ).session(session);

        
        for (let i = 0; i < answer.length; i++) {
            await Answers.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(answer[i]._id) },
                { answerText: answer[i].answerText },
                { new: true }
            ).session(session);
        }

        await session.commitTransaction();

        res.status(200).send({
            result: 1,
            message: "Question and answers updated successfully.",
        });
 } 
    catch (error) {
        await session.abortTransaction();
        res.status(500).send({
            result: 0,
           error_message:error
        });
    } finally {
      
        session.endSession();
    }
}
const deleteData = async (req, res) => {
    try {
        const { questionanswerId } = req.params;

        const deleteData = await QuestionSets.findOneAndDelete({ QuestiAnswerId: new mongoose.Types.ObjectId(questionanswerId) });
        const QuestionAnswerData = await QuestionsAnswers.findById({ _id: new mongoose.Types.ObjectId(questionanswerId) });

        if (!QuestionAnswerData) {
            console.log("QuestionAnswerData not found");
            return res.status(404).json({ message: "QuestionAnswerData not found" });
        }
        const question = await questions.findByIdAndDelete({ _id: QuestionAnswerData.quesId });

        for (let i = 0; i < QuestionAnswerData.ansId.length; i++) {
            await Answers.findByIdAndDelete({ _id: QuestionAnswerData.ansId[i] });
        }

        const deleteQuestionAnswer = await QuestionsAnswers.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(questionanswerId) });

        res.status(200).json({ message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during deletion" });
    }
};


module.exports={
    insertQuestionAnswers,
    insertQuestionAndAnswerId,
    getQuestionAnswer,
    editData,
    updateData,
    deleteData,
    
}





        // let date = new Date();
        // let istDate = date.toLocaleString('en-IN');

        // const QuestionAnswerdetail = await QuestionsAnswers.findOne({ quesId: new mongoose.Types.ObjectId(quesId) });
        
        // if (!QuestionAnswerdetail) {
        //     console.log("Empty");
        //     return;
        // }


        // for (let i = 0; i < newAnswer.length; i++) {
        //     const existingAnswer = await Answers.findOne({ answerText: newAnswer[i] }).session(session);
        //     if (!existingAnswer) {
        //         const newAns = new Answers({
        //             answerText: newAnswer[i],
        //             modifyBy: null,
        //             modifyAt: null,
        //             createdAt: new Date()  
        //         });

                
        //         const savedAnswer = await newAns.save({ session });

        //         console.log("New Answer Id:", savedAnswer._id);

                
        //         const updatedQuestionAnswer = await QuestionsAnswers.findByIdAndUpdate(
        //             QuestionAnswerdetail._id,  
        //             { $push: { ansId: savedAnswer._id } },
        //             { new: true, session }  
        //         );

        //     } else {
        //         res.send({
        //             message:"Answer already exists."
        //         })
        //        return;
        //     }
        // }
           
        
    



