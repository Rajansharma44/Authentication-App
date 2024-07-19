const mongoose=require("mongoose");
require("dotenv").config();

exports.DBConnect= ()=>
    {
        mongoose.connect( "mongodb://127.0.0.1:27017/Users",
        )
        .then(()=>
        {
            console.log("Database Connected");
        })
        .catch((err)=>
        {
           console.log(err.message);
        })
    }