const fs = require('fs');
const superagent = require('superagent');

const readFileProm = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file!')
      resolve(data);
    })
  })
}

const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('I could not write file!');
      resolve('Success!');
    })
  })
}

// ---------- ASYNC AWAIT try{} catch{} ----------
const getDogPict = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Prom, res2Prom, res3Prom]);
    const imageDogs = all.map(dog => dog.body.message);
    console.log(imageDogs);

    await writeFileProm('dog-img.txt', imageDogs.join('\n'));
    console.log('Random dog image saved to file!');
  }
  catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY!';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPict();
    console.log(x);
    console.log('3: Done!');
  }
  catch(err) {
    console.log('ERROR!');
  }
})();

/*
console.log('1: Will get dog pics!');
getDogPict()
  .then(x => {
    console.log(x);
    console.log('3: Done!');
  })
  .catch(err => {
    console.log('ERROR!');
  });
*/

// ---------- PROMISE .then() .catch() ----------
/*
readFileProm(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body);
    return writeFileProm('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err.message);
  });
*/
