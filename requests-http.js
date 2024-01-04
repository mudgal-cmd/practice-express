//HERE WE'VE HANDLED ALL THE HTTP REQUESTS USING THE HTTP MODULE/LIBRARY.


const http = require('http');

const { readFileSync } = require('fs');

// const homepage = readFileSync('./index.html', 'utf8');

// const server = http.createServer((req, res)=>{
//   if(req.url === '/'){
//     res.writeHead(200, {'content-type':'text/html'});
//     // res.write('<h1>Request successfull</h2>');
//     res.write(homepage);
//     console.log('New request');

//     res.end();
//   }
//   else{
//     res.write('Error: We could not find the requested resource');
//     res.end();
//   }
// });

// server.listen(5000, ()=>{
//   console.log('Server Listening at port 5000!!!');
// });


const homepage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeLogo = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');


const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/') {

    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homepage);
    res.end();
  }
  else if (req.url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h2>home page</h2>');
    res.end();
  }

  else if(req.url === '/styles.css'){
    res.writeHead(200, {'content-type': 'text/css'});
    res.write(homeStyles);
    res.end();
  }

  else if(req.url === '/logo.svg'){
    res.writeHead(200, {'content-type':'image/svg+xml'});
    res.write(homeLogo);
    res.end();
  }

  else if(req.url === '/browser-app.js'){
    res.writeHead(200, {'content-type':'text/javascript'});
    res.write(homeLogic);
    res.end();
  }


  else {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.write('<h2>Error: We are unable to process your request right now. Please try again later</h2>');
    res.end();
  }

});

server.listen(5000, () => {
  console.log('Server Listening');
});