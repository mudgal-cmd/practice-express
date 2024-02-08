const passport = require('passport');

const Strategy = require('passport-local');

const userData = require('../constant');

passport.serializeUser((user, done)=>{
  console.log('Serializer function');
  console.log(user);
  done(null, user.id); // we can even use 'done(null, user.displayName)' - this simply means we're serializing the object using the user's name which will be displayed in the passport object in session store, i.e., passport : {user: 'Smith'}
  
});

passport.deserializeUser((id, done)=>{
  
  console.log('Deserializer function');
  
  try{

    const findUser = userData.find(userEntry => userEntry.id === id);

    if(!findUser) throw new Error("User not found");

    done(null, findUser);


  }
  catch(err){
    done(err, null);
  }
});

const strategyVerifyFunc = (username, password, done)=>{
  try{
    
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    const findUser = userData.find(user => username === user.username);

    if(!findUser){throw new Error('Error: User not found');}

    // console.log(findUser);

    if(password!==findUser.password){throw new Error('Error: Please provide the correct credentials');}

    done(null, findUser); //null here is for the error.

  }
  catch(err){
    done(err, null); //null here is for the user data, because of error no user will be returned.
  } 
}

const localStrategy = new Strategy(strategyVerifyFunc);

module.exports = localStrategy;