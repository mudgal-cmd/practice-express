const express = require('express');

const passport = require('passport');

const session = require('express-session');

const localStrategy = require('./passport-strategies/local-strategy');

const app = express();

app.use(express.json());

passport.use(localStrategy);

app.use(session({
  
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 60000*60
  }

}));

app.use(passport.initialize());
app.use(passport.session()); // This will take care of attaching a dynamic user property ('user') to the req object to let us know who the actual user is that's making the request.



app.post("/api/auth/login", passport.authenticate('local'), (req, res)=>{
  
  console.log('Hi from login');
  
  res.sendStatus(200);


  //We can specifiy different strategies inside the passport.authenticate method, like 'google', 'github', etc.

});

// Below is how the sessionStore looks like after passport just serialized the user using the user id

// sessionID: 'Mq15E9au59Fk_xF3ZbjYX7c3xcy4_co8',
  // session: Session {
  //   cookie: {
  //     path: '/',
  //     _expires: 2024-02-07T01:16:42.066Z,
  //     originalMaxAge: 3600000,
  //     httpOnly: true
  //   },
  //   passport: { user: 2 } //User with ID '2' serialized
  // }

app.get('/api/auth/status', (req, res)=>{ // route method to check if the user is authenticated or not.
  
  if(req.user){return res.status(200).send('User session active');}



  res.status(200).send('User session inactive. Please login again.');
});

app.delete('/api/auth/logout', (req, res)=>{//It is generally recommended to use 'delete' or 'post' requests when logging out the user to avoid logging out user inadvertantly.

  // We don't need the login method because, we've got a specfic endpoint to allow the user to provide the credentials - validate the creds and allow the user to progress.

  if(!req.user) {return res.status(401).send('Unauthorised');}
  console.log(req.cookies);
  res.clearCookie('connect.sid');
  req.logOut((err)=>{

      if(err){return res.send(err);};
      res.status(200).send('User successfully Logged out');
      // next(err);
  });//passport provides the logout method and attaches it to the req object which completely destroys the session. 


});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});