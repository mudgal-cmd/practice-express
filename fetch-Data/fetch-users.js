const {people} = require('../data');

console.log(people);

const getUsers = () => {
  return people;
}

module.exports = getUsers;