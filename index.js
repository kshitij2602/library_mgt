    const express = require("express");
    const app = express();
    // const{users}=require('./data/user.json');
    const PORT = 8081;
const userRouter=require('./routes/users');
const bookRouter=require('./routes/books');
    // app.use(express.json());
    app.get('/',(req,res)=>{
        res.status(200).json({
            message:"server is up running succesfully"
        });
    })


    app.use('/users',userRouter);
    app.use('/books',bookRouter);
   
    // app.get('/users',(req,res)=>{
    //     res.status(200).json({
    //         success:true,
    //         data:users
    //      }
    //     );
    // })
    app.get('*',(req,res)=>{
        res.status(404).json({
            message:'route not define'
        });
    })

    app.listen(PORT,()=>{
        console.log(`server is runnig at ${PORT}`);
    })
