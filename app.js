const express = require('express');

const loginRouter = require('./routes/auth');

const app = express();


app.use('/', loginRouter);

app.listen(5000, ()=>{

  console.log('Server is listening on port 5000...');

});