const fs = require('fs');
const http = require('http');
const url = require('url');

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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/') {
    res.end('Hello from the server, Fresly!');
  } else if (pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Context-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Context-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})
