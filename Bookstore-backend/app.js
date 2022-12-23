const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();

dotenv.config();

let PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log('server is up and running on port '+PORT);
})

app.post('/user/generateToken', (req, res) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId : 12,
    }
    const token = jwt.sign(data,jwtSecretKey);
    res.send(token);
});

app.get('/user/validateToken', (req, res) =>{
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token,jwtSecretKey);
        if(verified){
            return res.send("Successfully verified");
        }else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
})