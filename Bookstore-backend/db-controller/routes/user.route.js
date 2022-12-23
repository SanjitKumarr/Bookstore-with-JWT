const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('../models/users');

//adding User router
userRoute.post("/register", async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
        res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "2h",
            });
        user.token = token;
        res.status(201).json(user);
  } catch (err) {
        console.log(err);
  }
});

userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

userRoute.route('/addUser').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get all User route
userRoute.route('/').get((req, res, next) => {
    User.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get User by id router
userRoute.route('/readUser/:id').get((req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});



userRoute.route('/updateUser/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req - body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Updated Sucessfully');
        }
    });
});


userRoute.route('/deleteUser/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    });
});

module.exports = userRoute