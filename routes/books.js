const express=require('express');
const {books}=require('../data/books.json');
const{users}=require('../data/user.json');
const router=express.Router();//local router
module.exports=router;   

// route: /books
    // method: GET
    // purpose: to get all books data
    // access: public
    router.get('/',(res,req)=>{
        res.status(200).json({
            success:true,
            data:books
        });
    })
    // route: /:id
    // method: GET
    // purpose: to get book data by thier id 
    // access: public
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const bok =books.find((each)=>each.id===id);
    if(!bok){
        res.statusCode(404).json({
            success:false,
            message:'book doest exist'
        })}
    return res.statusCode(200).json({
            success:true,
            message: "book found",
            data:bok,
        });
    
})
  // route: /books
    // method: POST
    // purpose: to create new book
    // access: public
    // parameter :none
    router.post('/',(req,res)=>{
        const{id,
            name,
            author,
            genre,
            price,
            publisher}= req.body;
        const book= books.find((each)=>each.id===id);
        if(book){
            return res.status(404).json({
                success:false,
                message:"book cant be added already exist"
            })
        }
        else{
        books.push({
                id,
                name,
                author,
                genre,
                price,
                publisher
            })
          return res.status(201).json({
            success:true,
            data:books
        }); 
    };
    })
    // books issued
    // method:GET
    // parameter:none 
    // route:/user/issuedbook
router.get('/issued',(res,req)=>{
    const Uissuedbooks=users.filter((each)=>{
        if(each.issuedBook)return each;
    });
    const issuedBooks=[];
    Uissuedbooks.forEach((each)=>{
        const book=books.find((book)=>book.id===each.issuedBook);
        // "issuedBook": "1",
        // "issuedDate": "04/01/2022",
        // "returnDate": "05/01/2022",
        book.issuedby=each.name;
        book.dateofissue=each.issuedDate;
        book.returnfate=each.returnDate;
        issuedBooks.push(book);
    });
    if(issuedBooks.length===0)return res.status(404).json({
        success:false,
        message:'no user issued any book'
    })
    else return res.status(200).json({
        success:true,
        data:issuedBooks
    });
})
/**
 * Route: /books/:id
 * Method: PUT
 * Decsription: Update a Bookk By Its ID
 * Access: Public
 * Paramaters: Id
 */
router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id === id);

    if(!book){
        return res.status(400).json({success: false, message: "Book with the given Id doesn't exist"});
    }

    const updatedBook = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updatedBook
    })
})
