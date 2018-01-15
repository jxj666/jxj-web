const fs = require('fs');
process.on('uncaughtException', (err) => {
  fs.writeSync(1, `Caught exception: ${err}\n`);
});

setTimeout(() => {
  throw new Error('Async Error');
}, 500);

console.log('run this line');