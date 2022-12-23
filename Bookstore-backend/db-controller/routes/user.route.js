const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../models/users');

//adding User router

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