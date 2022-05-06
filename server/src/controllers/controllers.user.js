const UserModel = require('../models/model.user');

// get all users list
exports.getUsersList = (req, res)=> {
    console.log('here all users list');
    UserModel.getAllUsers((err, users) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

// create new user
exports.createNewUser = (req,res) =>{
    console.log('req',req.body)
    const userReqData = new UserModel(req.body);
    console.log('req',req.body)
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please enter all fields'});
    }else{
        console.log("valid data");
        UserModel.createUser(userReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'User Created Successfully', data: user.insertId})
        })
    }
}