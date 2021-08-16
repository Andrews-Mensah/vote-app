const express = require("express");
const app = express();
const ejs = require('ejs');
const { pool } = require("./dbConfig");
const bcrypt = require('bcrypt');
const bodyParser  = require('body-parser');
const cors = require('cors');
const path = require('path');
const Pusher = require('pusher');

const poll = require('./routes/poll');

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

const pusher = new Pusher({
    appId: "1249139",
    key: "aa1cefd26c4690b93d17",
    secret: "0a2d98dbbee11c2fd11e",
    cluster: "eu",
    useTLS: true
  });
  
  pusher.trigger("presidential-poll", "presidential-vote", {
    message: "hello world"
  });

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Enable cors
app.use(cors());

//capturing the poll
app.use('/poll', poll);


app.use('/public', express.static('./public/'));
// app.use(express.static(__dirname + 'public'));

//Rendering main page
app.get('/', (req, res) => {
    res.render("index");
});

//Rendering admin login page
app.get('/admin/login', (req,res)=>{
    res.render("adminlogin")
});


//Rendering admin dashboard page
app.get('/admin/dashboard', (req,res)=>{
    res.render("admindashboard")
});

app.get('/admin/logout', (req,res)=> {
    req.logout();
    res.redirect('/admin/login')
})


//Rendering users dashboard page
app.get('/users/dashboard', (req,res)=>{
    res.render("userdashboard")
});

//adminLogin route
app.post("/admin/login", async (req,res) => {
    let {email} = req.body;

    try{
        const admin = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);

        if(admin.rows[0].roles === 'Admin'){
            return res.redirect('/admin/dashboard')
        }
        return res.redirect('/admin/login');
    }
    catch(err){
        console.error(err.message)
    }

})

    // console.log({
    //     email,
    //     password
    // });

    // let errors = [];
    // if(!email || !password){
    //     errors.push({message:"Please enter valid details"})
    // } else {
    //     let hashedPassword = await bcrypt.hash(password,10);
    //     console.log (hashedPassword)


    //     pool.query (
    //         `SELECT * FROM admin
    //         WHERE email = $1`, [email], (err,result) =>{
    //             if(err){
    //                 throw err;
    //             } else {
    //                 console.log(result.rows)
    //             }

    //             if(result.row.length === 0){
    //                 console.log("Email not registered as an admin");
    //                 res.render('/admin/login')
    //             }
    //         }
    //     )
    // }
// });


// //Authenticated functions
// function checkAuthenticated (req, res, next){
//     if (req.isAuthenticated()){
//         return res.redirect ('/admin/dashboard');
//     }
//     next();
// }

// function checkNotAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
    
//     return req.redirect('admin/login');
// }




//Start the server
app.listen(PORT, ()=>{
    console.log(`My server is running on port ${PORT}`)
});