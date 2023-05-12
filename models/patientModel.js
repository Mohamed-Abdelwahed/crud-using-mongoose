const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const patientSchema = new mongoose.Schema({
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
    validate(value){
      let password = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if(!(password.test(value))){
          throw new Error("Password must conatin uppercase , number , and special characters");
      }
    }
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
//==================================
patientSchema.pre("save", async function () {
  const patient = this;
  /** this refer to ==> document (data saved in database) */
  console.log(this);

  if (patient.isModified("password")) {
    patient.password = await bcryptjs.hash(patient.password, 8);
  }
});

/**
 * -----------------------------
 * login logic
 * ------------------------
 */
patientSchema.statics.findByCredentials = async (em , pass)=>{
  const user = await Patient.findOne({email:em} )
  // console.log(user);
  if(!user){
    throw new Error('uncorrect email  !');
  }
  // console.log(user);
  const isMatch = await bcryptjs.compare(pass , user.password)
  if(!isMatch){
    throw new Error("Uncorrect Password");
  }
  return user
}

//==================================
const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;
