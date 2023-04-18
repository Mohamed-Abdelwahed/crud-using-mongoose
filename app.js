const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./db/mongoose");

//to parse automatically
app.use(express.json());
//=======================

const patientRouter = require("./routers/patientRouter");

app.use(patientRouter);

app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
