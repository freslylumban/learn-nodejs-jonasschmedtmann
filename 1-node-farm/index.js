const fs = require('fs');
const http = require('http');

/////////////////////////////////////
// FILES

// Blocking code execution --> Synchronous Way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written, Fresly!');

// // Non blocking code execution
// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });
// console.log('Reading file...');


// Non-blocking code --> Asynchronous Way
// ES6 syntax
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR!');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written, Fresly!')
//       });
//     });
//   });
// });
// console.log('Will read file!');

// Nb:
// ES5 syntax
// function(err, data1) {}


/////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  console.log(req)
  res.end('Hello from the server, Fresly!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})
