import mongoose from "mongoose";

const conn = () =>{
    mongoose.connect(process.env.ATLAS_URI,{
        dbName:'kanarif491',
    }).then(()=>{
        console.log("Connected to the DB  successufly");
    }).catch((err)=>{
        console.log(`DB connection err:,${err}`);
    });
    
};

export default conn;