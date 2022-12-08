var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('adminLogin');
});

router.get('/adminpage',function(req,res,next){
  res.render('adminpage')
})



module.exports = router;
