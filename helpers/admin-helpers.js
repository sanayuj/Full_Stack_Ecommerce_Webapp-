const db = require('../config/connection');
const collections = require('../config/collections');
const bcrypt = require('bcrypt');
const { Db, ObjectId } = require("mongodb");
const { response } = require('express');
let objectId = require('mongodb').ObjectId

module.exports = {
    doSignup: (data) => {
        console.log("hihihihi");
        return new Promise(async (resolve, reject) => {
            data.password = await bcrypt.hash(data.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(data).then((response) => {
                resolve(response.insertedId);
            })
        })

    },
    doLogin: (data) => {
        console.log(data, "hahaha");
        return new Promise(async (resolve, reject) => {
            var loginStatus = false
            var response = {}
            const admin = await db.get().collection(collections.ADMIN_COLLECTION).findOne({ Email: data.Email });
            // console.log(admin);

            if (admin) {
                bcrypt.compare(data.Password, admin.Password).then((result) => {
                    console.log(result, "HAHAHA");
                    if (result) {
                        console.log("Loggin sucess");
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("loggin failed");
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("Error Admin")
                resolve({ status: false })
            }


        })
    },
    getuserDetails: () => {
        return new Promise(async (resolve, reject) => {
            let details = await db.get().collection(collections.USER_COLLECTION).find({}).toArray()
            resolve(details)

        }
        )
    },
    deleteUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_COLLECTION).deleteOne({ _id: objectId(userId) }).then((response) => {
                console.log(response)
                resolve(response);
            })


        })
    },
    updateUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((details) => {
                resolve(details)
            })
        })
    },
    UpdateDetails:(userData)=>{
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_COLLECTION).updateOne({_id:objectId(userData.userId)},{
                $set:{
                    Name:userData.Name,
                    Email:userData.Email
                }
            }).then((response)=>{
            resolve()
            })
        }
    
    )}
}
