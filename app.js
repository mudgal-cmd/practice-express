const http = require('http');

const {readFileSync} = require('fs');

const homepage = readFileSync('./index.html', 'utf8');

const server = http.createServer((req, res)=>{
  if(req.url === '/'){
    res.writeHead(200, {'content-type':'text/html'});
    // res.write('<h1>Request successfull</h2>');
    res.write(homepage);
    console.log('New request');
    
    res.end();
  }
  else{
    res.write('Error: We could not find the requested resource');
    res.end();
  }
});

server.listen(5000, ()=>{
  console.log('Server Listening at port 5000!!!');
});