const db = require('../config/connection');
const collections = require('../config/collections');
const bcrypt = require('bcrypt');
const { Db, ObjectId } = require("mongodb");
const { response } = require('express');

module.exports={
    doLogin: (data) => {
        console.log(data,"hahaha");
        return new Promise(async (resolve, reject) => {
            var loginStatus=false
            var response={}
            const admin = await db.get().collection(collections.ADMIN_COLLECTION).findOne({ Email: data.Email });
            // console.log(admin);

            if (admin) {
                bcrypt.compare(data.Password, admin.Password).then((result)=>{
                    // console.log(result,"HAHAHA");
                    if(result){
                        console.log("Loggin sucess");
                        response.admin=admin 
                        response.status=true
                        resolve(response)
                    }else{
                        // console.log("loggin failed");
                        resolve ({status: false})
                    }
                })
            }else{
                // console.log("Error Admin")
                resolve({status: false})
            }
                
            
        })
    },
}
