const express = require('express');

const router = express.Router();

const products = require('../fetch-Data/fetch-products');

const people = require('../fetch-Data/fetch-users');

// app.use(express.json()); //express.json() middleware is needed in app.js not here.

router.get('/', (req, res)=>{
  res.status(200).json({success:true, data:products()});
});

router.post('/addUser', (req, res)=>{
  
  const body = req.body;

  console.log(req.body);
  people().push(body);

  res.status(200).json(people());

});

router.delete('/deleteUserById/:userId', (req, res)=>{

  const {userId} = req.params;

  people().map(user => {
    
    if(user.id === Number(userId)){
      const deletedUser = user;

      people().splice(people().indexOf(deletedUser), 1);
      return res.status(200).json({success:true, data:people()});
    }
  });

  res.status(404).json({success: false, data: `Could not find the user with id - ${userId}`});

});

router.put('/modifyUserById/:userId', (req,res)=>{

  const {userId} = req.params;

  const {name} = req.body;

  const updatedUser = people().filter(user => user.id === Number(userId));

  people().map(user=>{

    if(user.id === Number(userId)){
      user.name = name;
      return res.status(200).json({success: true, data: people()});
    }

  }); 
  
  return res.status(404).json({success: false, msg: `Cannot update the user with ID: ${userId}`});

});


console.log(people());
module.exports = router;