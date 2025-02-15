const designation=require('../models/designationModel')
const set=require('../models/setModel')
const SetDesignation =require('../models/setDesignationModel')

const Designation = async (req, res) => {
    try {
        const data = await designation.find()
        if (data.length > 0) {
            res.send({
                result: 1,
                result_value: data
            })
        }
        else {
            res.send({
                result: 0,
                error_value: "Something went wrong"
            })
        }

    }
    catch (error) {
        res.send({
            result: 0,
            error_value: error
        })

    }
}

const setData = async (req, res) => {
    try {
        debugger;

        const { designationId } = req.params;
       
        var questionSets = [];
        const data = await SetDesignation.find({ desId: (designationId) })

        for (let i = 0; i < data.length; i++) {
            const setdata = await set.findById({ _id: data[i].setId })
            questionSets.push(setdata);
        }
        if (questionSets.length > 0) {
            res.send({
                result: 1,
                result_value: questionSets
            })
        }
        else {
            res.send({
                result: 0,
                error_value: "Sets does not availble in database"
            })
        }
    } catch (error) {
        res.send({
            result: 0,
            error_value: error
        })
    }
}

module.exports={Designation,setData}