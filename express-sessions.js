const express = require('express');

const app = express();

const session = require('express-session'); //importing module express-session to manage user session.

const {people, products} = require('./data');

app.use(session({
  secret: 'session-secret',
  saveUninitialized: false, 
  resave: false, //Note that express-session without 'saveUninitialized' and 'resave' properties is deprecated. 
  cookie: {
    maxAge: 90000 //'maxAge' preferred over 'expires'.
  }
}));

app.get('/login', (req, res)=>{
  // console.log(req.session); // to print the session object;
  // console.log(req.session.id); //to print session ID;
  req.session.visited = true;
  res.status(200).send('User is authorized...');
});

app.get('/api/users', (req, res)=>{

  // req.sessionStore.get(req.session.id, (err, sessionData)=>{
  //   if(err){
  //     throw err;
  //   }
  //   else{
  //     console.log(sessionData);
  //   }
  // });
  // 'sessionStore' conatins all the session info and here we're directly bypassing the req.session and interacting directly with the store. This might be useful in specific use cases where we want more control over session mgmt or need to do some custom operations on the sore..

  console.log(req.session, req.session.id);// The above info can be accessed by the session object in the req object.

  res.status(200).send(people);
});

app.listen(5000, ()=>{

  console.log('Server is listening on port 5000...');
});