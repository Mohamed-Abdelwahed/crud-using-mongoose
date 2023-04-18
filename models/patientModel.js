const mongoose = require("mongoose");
const validator = require("validator");
const Patient = mongoose.model("patient", {
  patientname: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is INVALID !!!!");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(val) {
      if (val <= 0) {
        throw new Error("AGE MUST BE POSITIVE NUMBER !!!!!!");
      }
    },
  },
  city: {
    type: String,
  },
});
module.exports = Patient;
