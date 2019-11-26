const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

module.exports = router;
