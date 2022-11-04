require('dotenv').config()
const jwt = require('jsonwebtoken');
const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const contacts = require('./routes/contactRoute');
const login = require('./routes/usersRoute');
const cors = require('cors')
const path = require("path");
const secret = 'secret'

const port = process.env.PORT || 8000
const app = express();

app.use(cors());

let mongo_url = process.env.MONGO_URL 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname + "/public")))

app.use('/contact',(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];
        jwt.verify(token, secret, function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"failed",
                    meassage: err.message
                });
            }
            req.user = decoded.data
            // console.log(decoded.data);
            next();
          });
    }else{
        return res.status(400).json({
            status:"failed",
            meassage: "not authenticated"
        });

    }
})


app.use('/contact', contacts);
app.use('/user', login);


mongooes.connect(mongo_url)
    .then(() => { console.log('db connected') })
    .catch((err) => { console.log("no connection") });


app.listen(port, () => console.log(`server connected to port ${port}`));