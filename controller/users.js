const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
var cors = require('cors');
//var ifconfig = require('ifconfig');
var ngrok = require('ngrok');
var passport = require('passport')

router.get('/',(req,res) => {
   res.status(200).json({
      message:'this page'
   })

})



router.post('/signup',cors(), function(req, res) {
   console.log(req.body);
   bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {
         return res.status(500).json({
            error: err
         });
      }
      else {
         const user = new User({
            _id: new  mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash    
         });
         user.save().then(function(result) {
            console.log(result);
            res.status(200).json({
               success: 'New user has been created'
            });
         }).catch(error => {
            //console.log(error)
            if(error.code==11000){
               return res.status(409).json({
                  message:"Exits"
            });
         }
         });
      }
   });
});


router.post('/signin',cors(), function(req, res){
   User.findOne({email: req.body.email})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
         if(err) {
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         }
         if(result) {
            console.log(result);
            const JWTToken = jwt.sign({
               email: user.email,
               _id: user._id
            },
            
            'secret',
               /*{
                  expiresIn: '2h'
               }*/
               );
            return res.status(200).json({
               success: 'Authurization success',
               token: JWTToken
               
               
            });
         }
         //res.redirect('/signin')
         return res.status(401).json({
            failed: 'Unauthorized Access',
            
            
         });
      });
   })
   .catch(error => {
      res.status(500).json({
         error: error
      });
   });;
});

router.get('/signout',cors(), function(req, res){
      req.logout();
      //res.setHeader('/signin',301);
      //res.json('');

      res.redirect('/');
      //res.end();
   
 });

module.exports = router
//comment the console part in body of signup