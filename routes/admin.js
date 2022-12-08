const express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
const { doLogin } = require('../Register/Register');
const router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) 
{
  if(req.session.adminloggedIn){
    res.redirect('/admin/adminpage')
  }else{
    res.render('adminLogin');
  }
  
});



router.get('/adminpage',function(req,res,next){
  adminHelpers.getuserDetails()
  res.render('adminpage',{admin:req.session.admin})
})




router.post('/adminpage',function(req,res,next){
  adminHelpers.doLogin(req.body).then((response)=>{
    if (response.status){
      req.session.adminloggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin/adminpage');
    }else{
      res.redirect('/admin')
    }
  
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  // console.log("dsds");
  res.redirect('/admin')
})


module.exports = router;
