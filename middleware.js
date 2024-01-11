const express = require('express');

const app = express();

//middleware function.
const logger = (req, res, next)=>{ //could have used app.use() to add middleware to the express app.
  
  const method = req.method;
  const url = req.url;
  const time = new Date();
  
  console.log(method);
  console.log(url);
  console.log(time.getTime());

  if(url === '/asd'){
    return res.send('Hello World');
  }


  //We can even send response from the middleware itself if there's a need to not allow a request to go to the server.

  next();//This next method hands over the control/flow to the next middleware (get, post route methods).

};

app.get('/', logger, (req, res)=>{ 
  //logger is the middleware and as the name suggests is placed between the URL and the 'req' and 'res' objects.
  // A middleware is a function that has access to the request and response objects.
  res.send('Home');

});

app.get('/about', (req, res)=>{

  res.send('About');

});


app.listen(5000, (req, res)=>{

  console.log('Server is listening at port 5000...');

});