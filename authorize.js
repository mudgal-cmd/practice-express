const authorize = (req, res, next)=>{
  
  const{user}=req.query;
  console.log(req.query);
  if(user === 'sam'){
    console.log('authorized');
    next();
  }

  else{
    res.status(401).send('<h1>UNAUTHORIZED</h1>');
  }


}

module.exports = authorize;