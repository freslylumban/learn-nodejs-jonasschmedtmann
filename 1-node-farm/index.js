const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Context-type': 'text/html'
    })
    const cardsHtml = dataObj.map(elmnt => replaceTemplate(tempCard, elmnt)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

  // PRODUCT page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Context-type': 'text/html'
    })
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

  // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Context-type': 'application/json'
    });
    res.end(data);

  // NOT FOUND
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
