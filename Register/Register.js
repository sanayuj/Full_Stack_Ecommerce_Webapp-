const db=require('../config/connection')
const collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password= await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response)=>{
                resolve(response.insertedId);
            })
        })
       
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            console.log(userData);
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            // console.log(user);
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login sucess");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("error")
                        resolve({status:false})
                    }
                })

            }else{
                console.log("login failed");
                resolve({status:false})
            }

        })
    }
    
}