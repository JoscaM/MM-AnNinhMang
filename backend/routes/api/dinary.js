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




module.exports = router;
