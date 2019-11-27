const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var randomize = require('randomatic');
// Item Model
const Dinary = require('../../models/Dinary')
const User = require('../../models/User');

router.get('/get', auth,(req, res) => {
    Dinary.find({},function(err, dinary) {
      res.json(dinary)
    })
});


router.get('/getUser', auth,(req, res) => {
    User.find({}).select('-password')
    .then(users=>
      res.json(users))
});
router.get('/getOneUser', auth,(req, res) => {
    User.findById(req.user.id).select('-password')
    .then(users=>
      res.json(users))
});


router.delete('/:id', auth, (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then(item => item.remove().then(() => {
      User.findById( req.user.id).then( res=>{
      const newDinary = new Dinary({
        author : res.name,
        action : 'Delete User'
      })
    newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))
    })
      res.json({ success: true })}))
    .catch(err => res.status(404).json({ success: false }));
});

router.post('/updateAccount',auth,(req,res)=>{
  const user= req.body;
  const newDinary = new Dinary({
    author : 'admin',
    action : 'Update'
  })
newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))

    User.findByIdAndUpdate(user.oldId, user)
    .then(result => {
        // res.json(result);
            const mailOption ={
            from: 'joscamoster@gmail.com',
            to: result.email,
            subject: 'Inform',
            text: "Admin has modify your account!"
          };
          console.log(mailOption);
          sendmail(mailOption);
      })
    });


    router.post('/createAccount', auth,(req, res) => {

      const { name, email  } = req.body;

      // Simple validation
      if(!name || !email ) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

      // Check for existing use
      User.findOne({ email })
        .then(user => {
          if(user) return res.status(400).json({ msg: 'User already exists' });
              let password = randomize('A0', 5)
          const newUser = new User({
            name,
            email,
            password
          });
          const newDinary = new Dinary({
            author : 'admin',
            action : 'Register'
          })
        newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))

        const mailOption ={
        from: 'joscamoster@gmail.com',
        to: email,
        subject: 'Inform',
        text: newUser
      };
      console.log(mailOption);
      sendmail(mailOption);
          // Create salt & hash
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) {console.log( err);}
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                      if(err) throw err;
                      const mailOption ={
                      from: 'joscamoster@gmail.com',
                      to: email,
                      subject: 'Inform',
                      text: newUser
                    };
                    console.log(mailOption);
                    sendmail(mailOption);
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
