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
  
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body);
  
    await writeFileProm('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  }
  catch (err) {
    console.log(err);
  }
}
getDogPict();

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
