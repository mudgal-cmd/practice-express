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



app.post("/api/auth", passport.authenticate('local'), (req, res)=>{
  console.log('Hi from login');

  res.sendStatus(200);
//We can specifiy different strategies inside the passport.authenticate method, like 'google', 'github', etc.

});

app.get('/api/auth/status', (req, res)=>{
  console.log('I am auth Status');
  res.status(200).send(req.user);
});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});