const express = require('express');
const { response } = require('../app');
const adminHelpers = require('../helpers/admin-helpers');
const { doLogin } = require('../Register/Register');
const router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) 
{
  if(req.session.adminloggedIn){
    res.redirect('/admin/adminpage')
  }else{
   
    res.render('adminLogin',{"loginErr":req.session.adminlogginErr});
    req.session.adminlogginErr=false
  }
  
});



router.get('/adminpage',function(req,res,next){
  adminHelpers.getuserDetails().then((details)=>{
    console.log(details,"haaha");
    res.render('adminpage',{admin:req.session.admin,details})
  })
  
})




router.post('/adminpage',function(req,res,next){
  adminHelpers.doLogin(req.body).then((response)=>{
    if (response.status){
      req.session.adminloggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin/adminpage');
    }else{
      req.session.adminlogginErr=true
      res.redirect('/admin')
    }
  
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  // console.log("dsds");
  res.redirect('/admin')
})

router.get('/delete-user/:Id',(req,res)=>{
  var userId=req.params.Id
  console.log(userId)
  adminHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/adminpage')

  })

})

router.get('/adduser', function(req, res, next) {
  // adminHelpers.doSignup(req.body)
  res.render('addUserAdmin');

});

router.post('/addUserAdmin', function(req, res, next) {
  adminHelpers.doSignup(req.body).then((response)=>{
    res.redirect('/admin/adminpage');
  })
  

});

router.get('/edit-user/:id',(req,res,next)=>{
  console.log(req.params.id,("gfg"));
  adminHelpers.updateUser(req.params.id).then((details)=>{
    // res.redirect('')
    console.log(details,("xcfxzfzx"));
  res.render('admin-Editpage',{details})
  })
  
  // console.log("How are u");
})

router.post('/edit-user',(req,res,next)=>{
  console.log("ffffffo");
  adminHelpers.UpdateDetails(req.body).then(()=>{
    res.redirect("/admin/adminpage")
  })
})

module.exports = router;
