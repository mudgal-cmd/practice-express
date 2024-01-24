const express = require('express');

const loginRouter = require('./routes/auth');

const app = express();

const getUsersRouter = require('./routes/main-app-requests');

app.use(express.json()); // required here and not in the routes file.

app.use('/login', loginRouter);

app.use('/api/user', getUsersRouter);

// app.use('/api/postman', getUsersRouter);

app.listen(5000, ()=>{

  console.log('Server is listening on port 5000...');

});