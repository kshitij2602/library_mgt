const express= require('express');
const {users}=require("../data/user.json");
const router=express.Router();//local router

    // route: /users
    // method: GET
    // purpose: to get all users data
    // access: public
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
     }
    );
})
 // user/:id
    // colon : is use bcs we are pasiing some dynamic value...
    // parameter : id
    router.get('/:id',(req,res)=>{
        const {id}=req.params;
        // params(parameters) is used to access to value we 
        const user= users.find((each)=>each.id===id);
        if(!user){
            return res.statusCode(404).json({
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
    router.post('/',(req,res)=>{
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
    router.put('/:id',(req,res)=>{
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
    // route: /users/:id
    // method: delete
    // purpose: to delete the user by their id 
    // access: public
    // parameter :ID
    router.delete('/:id',(req,res)=>{
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
/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Decsription: Get all user subscription details by their ID
 * Access: Public
 * Paramaters: ID
 */

router.get('/subscription-details/:id', (req, res)=>{
    const {id} = req.params;

    const user = users.find((each)=> each.id === id);
    if(!user)
        return res.status(404).json({success: false, message: "User With The Given Id Doesn't Exist"});

    const getDateInDays = (data = "")=> {
        let date;
        if(data === ""){
            // current Date
            date = new Date();
        }else{
            // getting date on a basis of data variable
            date = new Date(data);
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };  // Subscription expiration calcus
    // Jan 1, 1970, UTC // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionDate - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0, 
    }

     res.status(200).json({
        success: true,
        data: data,
     })
})
    module.exports=router;