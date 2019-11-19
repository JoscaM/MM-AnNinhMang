const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');
const Dinary = require('../../models/Dinary')
const User = require('../../models/User');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/items', auth,(req, res) => {
  console.log(req.user.id);
  Item.find({author : req.user.id})
    .then(items => {
      res.json(items)});
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/add', auth, (req, res) => {
  id = req.user.id;
  console.log(id)
  const newItem = new Item({
    name: req.body.name,
    author : id
  });
  User.findById( req.user.id).then( res=>{
  const newDinary = new Dinary({
    author : res.name,
    action : 'Add Item'
  })
newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))
})
  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => {
      User.findById( req.user.id).then( res=>{
      const newDinary = new Dinary({
        author : res.name,
        action : 'Delete Item'
      })
    newDinary.save().then ( res => console.log('Save dinary success!!')).catch(err => console.log(err))
    })
      res.json({ success: true })}))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
