const express = require('express');

const app = express();

const axios = require('axios');

app.use(express.json());

async function fetchUsers() {

  const response = await axios.get('https://fakestoreapi.com/users');

  const data = response.data;

  return data;
}

app.put('/api/users/:id', (req, res) => {

  const { id } = req.params;

  const { uname } = req.body; //Field to be updated
  console.log(id, uname);

  const usersPromise = fetchUsers();

  usersPromise.then(users => {

    const updatedUsers = [...users];

    const userToBeUpdated = updatedUsers.filter(user => user.id === Number(id));
    // console.log(userToBeUpdated, Object.keys(userToBeUpdated));

    const updatedUserIndex = updatedUsers.findIndex(user => user.id === Number(id));

    if (!userToBeUpdated || Object.keys(userToBeUpdated).length < 1) {
      return res.status(404).json({ success: true, data: 'No user found' });
    } //If the user does not exist.

    else {

      console.log(userToBeUpdated);

      userToBeUpdated[0].username = uname;

      updatedUsers.splice(updatedUserIndex,1, userToBeUpdated);

      res.status(201).json({ success: true, data: updatedUsers });
    }


  }).catch(err => console.log(err));

});

app.delete('/api/deleteUserById/:id', (req, res) => {

  const { id } = req.params;

  console.log(id);

  if(isNaN(Number(id))){
    return res.status(404).json({success:false, data:[]});
  }

  const userPromise = fetchUsers();

  userPromise.then(users => {


    let newUsers = [...users];

    let deletedUser = newUsers.filter(user => user.id === Number(id));
    
    if(!deletedUser || Object.keys(deletedUser).length<1){
      return res.status(404).json({success:false, data:'Could not find the user'});
    }

    const deletedElementIndex = newUsers.findIndex(user => user.id === Number(id));

    newUsers.splice(deletedElementIndex,1);

    res.status(200).json({success:true, data: newUsers});


  }).catch(err => console.log(err));

});


app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});

