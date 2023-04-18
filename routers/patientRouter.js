const express = require("express");
const Patient = require("../models/patientModel");
const router = express.Router();

router.post("/patients", (req, res) => {
  console.log(req.body);

  const patient = new Patient(req.body);
  patient.save()
    .then((patient) => {
      res.status(200).send(patient);
    })
    .catch((e) => res.status(400).send(e));
 });
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
router.patch("/patients/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const patient = await Patient.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).send("NO Patient founded");
    }
    res.status(200).send(Patient);
  } catch (e) {
    res.status(400).send(e);
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

module.exports = router;
