const date = '2020-08-21T23:15:30.000Z';
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const toiso = today.toISOString();
console.log(today);
console.log(toiso);
console.log(new Date(Date.now()));
