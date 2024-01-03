const http = require('http');

const server = http.createServer((req, res)=>{
  if(req.url === '/'){
    res.writeHead(200, {'content-type':'text/html'});
    res.write('<h1>Request successfull</h2>');
    res.end();
  }
  else{
    res.write('Error: We could not find the requested resource');
    res.end();
  }
});

server.listen(5000);