const express = require('express');

const router = express.Router();

const products = require('../fetch-Data/fetch-products');

const { getAllUsersController,
  addUserPostman,
  deleteUserById, modifyUserById } = require('../controllers/app-request-controller');

// const addUserPostman = require('../controllers/app-request-controller');

// app.use(express.json()); //express.json() middleware is needed in app.js not here.



// router.get('/', getAllUsersController);
router.post('/addUser', addUserPostman);
router.delete('/deleteUserById/:userId', deleteUserById);
// router.put('/modifyUserById/:userId', modifyUserById);

// another way to handle routes is as follows:

router.route('/modifyUserById/:userId').put(modifyUserById);

router.route('/').get(getAllUsersController);

//If the route is same, we can chain the route methods as well. 
//router.route('/Users').get(getAllUsers).post(addUserById);


module.exports = router;