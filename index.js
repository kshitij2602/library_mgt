const express = require("express");
const app = express();
const{users}=require('./data/user.json');
const PORT = 8081;

// app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is up running succesfully"
    });
});
app.get('*',(req,res)=>{
    res.status(404).json({
        message:'route not define'
    });
})
app.listen(PORT,()=>{
    console.log(`server is runnig at ${PORT}`);
})
