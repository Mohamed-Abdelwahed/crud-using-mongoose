const express = require("express");
const Patient = require("../models/patientModel");
const router = express.Router();

// router.post("/patients", (req, res) => {
//   console.log(req.body);

//   const patient = new Patient(req.body);
//   patient
//     .save()
//     .then((patient) => {
//       res.status(200).send(patient);
//     })
//     .catch((e) => res.status(400).send(e));
// });
//////////////////////////////
router.get("/patients", (req, res) => {
  Patient.find({})
    .then((patients) => {
      res.status(200).send(patients);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

//=========================
router.get("/patients/:id", (req, res) => {
  console.log(req.params.id);
  const _id = req.params.id;
  Patient.findById(_id)
    .then((patient) => {
      if (!patient) {
        res.status(404).send("unable to find Patient");
      }
      res.status(200).send(patient);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
///////////////////////////////
//=====================patch to edite
router.patch('/patients/:id', async (req, res) => {
  try {
    //=================
    const updates = Object.keys(req.body);
    console.log(updates);
    //=================
    const _id = req.params.id;

    //========================================
    // const patient = await Patient.findByIdAndUpdate(_id,req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    //======================
    const patient = await Patient.findById(_id);

    if (!patient) {
      return res.status(404).send("NO Patient founded");
    }
    updates.forEach((ele)=>(patient[ele] = req.body[ele]))

    await patient.save()
    res.status(200).send(patient);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});
///////////////////////////////////
//=============Delete
router.delete("/patients/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const patient = await Patient.findByIdAndDelete(_id);
    if (!patient) {
      res.status(404).send("Unable to find Patient");
    }
    res.status(200).send(patient);
  } catch (e) {
    res.status(500).send(e);
  }
});


/**
 *  ===============x==================================
 *  LOGIN LOGIC
 * ===================================================
 */

router.post('/login' , async (req,res)=>{
  try {
    const patient = await Patient.findByCredentials(req.body.email , req.body.password);
    const token = await patient.generateToken();

    res.status(200).send({patient , token});
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
})

/**
 * ---------------------------------
 * End Login Logic
 * ----------------------------------
 */

/**
 * 
 * 
 *-----------------------------------------
 * Token Logic
 * ----------------------------------------
 */


    router.post("/patients" , async (req,res)=>{
      try{
        const patient = new Patient(req.body)
        const token = await patient.generateToken()
        await patient.save()

      res.status(200).send({patient , token})
      }catch(e){
        res.status(400).send(e)
      }
    })


 /**
 * 
 * 
 *-----------------------------------------
 * End Token Logic
 * ----------------------------------------
 */

 /**
 * 
 *-----------------------------------------
 * Start Profile
 * ----------------------------------------
 */
router.get('/profile' , auth , async(req,res)=>{
  res.status(200).send(req.body);
})
 /**
 * 
 *-----------------------------------------
 * End Profile
 * ----------------------------------------
 */

 /**
 * 
 *-----------------------------------------
 * Start Logout
 * ----------------------------------------
 */
router.delete('/logout' , auth , async(req,res)=>{
  try{
    console.log(req.body);
    req.patient.tokens = req.user.tokens.filter((el)=>{
      return el !== req.token
    })
    await req.patient.save();
    res.send();
  }catch(e){
    res.status(500).send(e);
  }
})
 /**
 * 
 *-----------------------------------------
 * End Logout
 * ----------------------------------------
 */

 /**
 * 
 *-----------------------------------------
 * Start Logout ALL
 * ----------------------------------------
 */
router.delete('/logoutAll' , auth , async(req,res)=>{
  try{
   req.patient.tokens = [];
   await req.user.save();
   res.send();
    }catch(e){
    res.status(500).send(e);
  }
})
 /**
 * 
 *-----------------------------------------
 * End Logout ALL
 * ----------------------------------------
 */

module.exports = router;
