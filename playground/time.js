var moment = require('moment');

var date = moment();
date.add(1,'year').subtract(9,'month')
console.log(date.format('MMM Do YYYY hh:mm:s a'))
console.log(date.format('h:mm a'))