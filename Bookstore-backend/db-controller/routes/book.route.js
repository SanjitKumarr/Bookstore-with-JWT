const express = require('express');
const app = express();
const bookRoute = express.Router();

let Book = require('../model/book');

//adding book router

bookRoute.route('/addBook').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get all book route
bookRoute.route('/').get((req, res, next) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//get Book by id router
bookRoute.route('/readBook/:id').get((req, res, next) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});



bookRoute.route('/updateBook/:id').put((req, res, next) => {
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


bookRoute.route('/deleteBook/:id').delete((req, res, next) => {
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

module.exports = bookRoute