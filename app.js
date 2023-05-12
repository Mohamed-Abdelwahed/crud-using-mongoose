const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./db/mongoose");

//to parse automatically
app.use(express.json());
//=======================

const patientRouter = require("./routers/patientRouter");
app.use(patientRouter);


/**================================================== */


const bcryptjs = require('bcryptjs')
const passwordFunction = async ()=>{
  const password = "123456mm";
  const hashPassword = await bcryptjs.hash(password, 8);
  /**
   * 8 to be strong password  (8 times for)
   */
  console.log(password);
  console.log(hashPassword);
  const compare = await bcryptjs.compare('123456mm' , hashPassword);
  console.log(compare);
} 

passwordFunction();




app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
