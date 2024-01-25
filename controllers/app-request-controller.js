const people = require('../fetch-Data/fetch-users');

const getAllUsersController = (req, res) => {
    res.status(200).json({ success: true, data: people() });
  };

const addUserPostman = (req, res) => {

  const body = req.body;

  console.log(req.body);

  people().push(body);

  res.status(200).json(people());

}

const deleteUserById = (req, res)=>{

  const {userId} = req.params;

  people().map(user => {
    
    if(user.id === Number(userId)){
      const deletedUser = user;

      people().splice(people().indexOf(deletedUser), 1);
      return res.status(200).json({success:true, data:people()});
    }
  });

  res.status(404).json({success: false, data: `Could not find the user with id - ${userId}`});

}

const modifyUserById = (req, res) => {

  const { userId } = req.params;

  const { name } = req.body;

  const updatedUser = people().filter(user => user.id === Number(userId));

  people().map(user => {

    if (user.id === Number(userId)) {
      user.name = name;
      return res.status(200).json({ success: true, data: people() });
    }

  });

  return res.status(404).json({ success: false, msg: `Cannot find the user with ID: ${userId}` });

}

module.exports = {
  getAllUsersController,
  addUserPostman,
  deleteUserById,
  modifyUserById
};
