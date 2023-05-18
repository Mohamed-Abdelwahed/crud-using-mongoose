const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel")


const auth = async(req,res , next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decode = jwt.verify(token , "mohamed500")
        console.log(decode);

        const patient = await Patient.findOne({_id:decode._id , tokens : token})
        console.log(patient);
        if(!patient){
            throw new Error()
        }
        req.patient = patient
        req.token = token
        next()
    }catch(e){
        res.status(401).send(e.message)
    }
}


module.exports = auth