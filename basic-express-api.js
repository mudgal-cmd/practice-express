const express = require('express');

const app = express();

const data = [{ name: 'John', age: 45 }, { name: 'Graham', age: 62 }];

console.log(newArr);

app.get('/', (req, res) => {
  res.status(200).json(data);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});