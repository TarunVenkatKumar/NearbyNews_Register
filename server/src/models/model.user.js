var dbConn = require("../../config/db.config")

var User = function(user) {
    this.email = user.email;
    this.pincode = user.pincode;
    this.city = user.city;
}

// get all users
User.getAllUsers = (result)=>{
    dbConn.query('SELECT * FROM users', (err,res)=>{
        if(err){
            console.log("Error while fetching all users",err);
            result(null,err);
        }else{
            console.log("Users fetched successfully");
            result(null,res);
        }
    })
}

// create new employee
User.createUser = (userReqData, result) =>{
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('User created successfully');
            result(null, res)
        }
    })
}


module.exports = User;