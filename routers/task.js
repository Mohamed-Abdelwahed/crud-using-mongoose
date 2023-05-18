const express = require("express");
const { findByIdAndDelete } = require("../models/patientModel");
const auth = require("../middleware/auth");
const Task = require("../models/task");
const router = express.Router();

router.post("/task", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.patient._id });
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findById(req.params.id);
    const id = req.params.id;
const task = await Task.findOne({_id:id , owner : req.patient._id})

    if (!task) {
      return res.status(404).send("التاسك دا مش بتاعك");
    }
    res.status(200).send(task);
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.patch("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send("NO Task edited");
    }

    res.status(200).send(task);
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.send(404).send("no task found");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
