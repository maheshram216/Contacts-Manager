const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const contacts = require('./routes/contactRoute');
const login = require('./routes/usersRoute');
const cors = require('cors')

dotenv.config({path:'./config.env'})

const PORT = process.env.PORT || 8000
const URL = process.env.URL
const SECRET = process.env.SECRET
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static(path.join(__dirname + "/public")))

app.use('/contact', (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("test ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    meassage: err.message
                });
            }
            req.user = decoded.data
            // console.log(decoded.data);
            next();
        });
    } else {
        return res.status(400).json({
            status: "failed",
            meassage: "not authenticated"
        });

    }
})


app.use('/contact', contacts);
app.use('/user', login);


mongooes.connect(URL)
    .then(() => { console.log('db connected') })
    .catch((err) => { console.log("no connection") });

if (process.env.NODE_ENV == "production") {
    app.use(express.static("clientt/build"));
};


app.listen(PORT, () => console.log(`server connected to port ${PORT}`));