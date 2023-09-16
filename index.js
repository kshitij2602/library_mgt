// const express = require("express");
// const app = express();
// const{users}=require('./data/user.json');
// const PORT = 8081;

// // app.use(express.json());
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message:"server is up running succesfully"
//     });
// });
// app.get('*',(req,res)=>{
//     res.status(404).json({
//         message:'route not define'
//     });
// })
// app.listen(PORT,()=>{
//     console.log(`server is runnig at ${PORT}`);
// })
    const express = require("express");
    const app = express();
    const{users}=require('./data/user.json');
    const PORT = 8081;

    // app.use(express.json());
    app.get('/',(req,res)=>{
        res.status(200).json({
            message:"server is up running succesfully"
        });
    })
    // route: /users
    // method: GET
    // purpose: to get all users data
    // access: public
    app.get('/users',(req,res)=>{
        res.status(200).json({
            success:true,
            data:users
         }
        );
    })
    // user/:id
    // colon : is use bcs we are pasiing some dynamic value...
    app.get('/users/:id',(req,res)=>{
        const {id}=req.params;
        // params(parameters) is used to access to value we 
        const user= users.find((each)=>each.id===id);
        if(!user){
            return res.status(404).json({
                success:false,
                message: "user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message: "user found",
            data:user,
        });
    })
    // route: /users
    // method: POST
    // purpose: to create new user 
    // access: public
    // parameter :none
    app.post('/users',(req,res)=>{
        const{id,name,surname,email,subscriptionType,subscriptionDate}= req.body;
        const user= users.find((each)=>each.id===id);
        if(user){
            return res.status(404).json({
                success:false,
                message:"user cant be added already exist"
            })
        }
        else{
        users.push({
                id,
                name,
                surname,
                email,
                subscriptionType,
                subscriptionDate,
            })
          return res.status(201).json({
            success:true,
            data:users
        }); 
    }
    })
    // route: /users/:id
    // method: PUT
    // purpose: to update the user by their id 
    // access: public
    // parameter :ID
    app.put('/users/:id',(req,res)=>{
        const{id}=req.params;
        const{data}=req.body;
        const user=users.find((each)=>each.id===id);
        if(!user)
        return res.status(404).json({
                status :false,
            message:"user doesnt exist"})
        else{
        const updateuser=users.map((each)=>{
            if(each.id===id){
                return{
                   ...each,//triple dot returns the updates data without {} bracket
                   ...data,//triple dot here reutrn whole list of users
                }
            }
        return each;
    })
    return res.status(200).json({
        success:true,
        data:updateuser
    })
    }
    })
    app.delete('/users/:id',(req,res)=>{
        const{id}=req.params;
        const user=users.find((each)=>each.id===id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user doesnt exist"
                })
        }
        else{
        const index=users.indexOf(user);
        users.splice(index,1);
        return res.status(200).json({
            success:true,
            data:users
        })
        }
    })



    app.get('*',(req,res)=>{
        res.status(404).json({
            message:'route not define'
        });
    })

    app.listen(PORT,()=>{
        console.log(`server is runnig at ${PORT}`);
    })
