const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var randomize = require('randomatic');
// User Model
const User = require('../../models/User');
const Dinary = require('../../models/Dinary')




router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          const newDinary = new Dinary({
            author : user.name,
            action : 'Login'
          })
          // send code verify to mail
          let code = randomize('A0', 5)
          const mailOption ={
            from: 'joscamoster@gmail.com',
            to: email,
            subject: 'Veriry with code',
            text: code
          };
          console.log(email);
            sendmail(mailOption);
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(code, salt, (err, hash) => {
                if(err) throw err;
                codehash = hash;
          //save dinary
        newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err));
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  role: user.role,
                  code : codehash

                }
              });
            }
          )
        })})
        })
    })

});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log(req);
  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing use
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });
      const newDinary = new Dinary({
        author : name,
        action : 'Register'
      })
    newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))


      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              )
            })
        })
      })
    })
});


const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth: {
    user : 'joscamoster@gmail.com',
    pass : 'joscaso1'
  }
})

// @route   POST api/users
// @desc    Confirm with gmail
// @access  ...
function sendmail(mailOption) {
  transporter.sendMail(mailOption,(err,res)=>{
    if(err){
      console.log(err);
    }
    else {
      console.log('Email sent ' + res.response)
    }
  })
};

module.exports = router;
