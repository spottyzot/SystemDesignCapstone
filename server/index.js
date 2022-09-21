const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes.js');
const cors=require("cors");

const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());
//set up our initial app connections


app.use('/products', routes);


app.listen(process.env.SERVER_PORT, () =>
  console.log(`app listening at http://${process.env.PGHOST}:${process.env.SERVER_PORT}`)
);

