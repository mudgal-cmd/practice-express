//This approach of serving the content to the client invloves placing all the static content in a root folder - 'public' or 'static'.

const express = require('express');

const app = express();

// We have placed the HTML content/file too in the 'public' folder.
app.use(express.static('./public'));

// app.all();

app.all('*', (req, res)=>{
  res.status(404).send('Error: could not find the requested resource');
});


app.listen(5000, (req,res)=>{
  console.log('Server is listening at port 5000...');
});