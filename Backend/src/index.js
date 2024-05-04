const express = require("express");
const dbConnect = require("./utils/dbConnect");
const apiRoutes = require("./routes/user-routes")
const bodyParser = require("body-parser");
const passort = require("passport");
const passportAuth = require('./utils/jwt-middleware.js')


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passort.initialize());
passportAuth(passort);

app.use('/user' , apiRoutes);
app.listen(3000, ()=> {
    console.log("App is running on PORT 3000")  
    dbConnect();  
})
