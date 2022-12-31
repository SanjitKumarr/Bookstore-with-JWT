const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('../models/users');
let Book = require('../models/books');
let Cart = require('../models/cart');
const auth = require("../../middleware/auth");

//adding User router
userRoute.post("/register",async (req, res) => {
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
        res.status(201).json(user.token);
  } catch (err) {
        console.log(err);
  }
});

userRoute.post("/login",async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).json({ userId:user._id, accessToken:user.token });
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

//adding book router

userRoute.route('/addBook').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get all book route
userRoute.route('/').get((req, res, next) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get Book by id router
userRoute.route('/readBook/:id').get((req, res, next) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});



userRoute.route('/updateBook/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
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


userRoute.route('/deleteBook/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    });
});

 userRoute.route('/addToCart').post(async (req, res, next) => {
    console.log(req.body.userId);
    let userId= req.body.userId;
    let bookId= req.body.bookId;
    let existingCart = await Cart.find({userId: userId});
    if(existingCart.length === 0){
        await Cart.create({userId: userId});
    }
    Cart.updateOne({userId: userId},{$push : {userCart:{bookId:bookId}}},(error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            }) 
        }
    });
});

userRoute.route('/getUserCart').post((req, res, next) => {
    console.log(req.body.userId);
    let userId= req.body.userId;
    Cart.find({userId : userId}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

userRoute.route('/clearUserCart').delete((req, res, next) => {
    let userId= req.body.userId;
    Cart.deleteOne({userId : userId}, (error, data) => {
        if(error) {
            return next(error);
        }else {
            res.status(200).json({
                msg: data
            }) 
        }
    })
})

// module.exports = bookRoute
module.exports = userRoute