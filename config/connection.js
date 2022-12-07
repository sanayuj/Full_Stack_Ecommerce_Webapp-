const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname="validation"
    mongoClient.connect(url,(err,data)=>{
        if (err)   return done(err)
        state.db=data.db(dbname)
    //    state.db.collection("data").insertOne({user:"sanay"})
        done()
    })
   
}  
module. exports.get=function (){
return state.db
}