const fs = require("fs");
const superagent = require("superagent");

// superagent.get('https://dog.ceo/api/breeds/image/random').then(()=>{
//   console.log('api fetched');
// }).catch(()=>{
//   console.log('error occured');
// })

// const dogpic = async () => {
//   try{
//     const res = await superagent.get('https://dog.ceo/api/breeds/image/random');
//     console.log(res.body.message);
//   }catch(err){
//     console.log(err);
//     throw(err); //marks the whole promise as reject.
//   }
// };
// console.log('code starts');
// dogpic().then(()=>{
//   console.log('code ends');
// }).catch((err)=>{
//   console.log('Error!!');
// });

console.log('code starts');

(async () => {
  try {
    const res1 = await superagent.get("https://dog.ceo/api/breeds/image/random");
    const res2 = await superagent.get("https://dog.ceo/api/breeds/image/random");
    const res3 = await superagent.get("https://dog.ceo/api/breeds/image/random");
    // console.log(res.body.message);


    //executing multiple awaits simultaneosuly. 
    const all = await Promise.all([res1,res2,res3]);
    const imgsApi = all.map(el => el.body.message);
    console.log(imgsApi);

  } catch (err) {
    console.log(err);
    throw err; //marks the whole promise as reject.
  }

})()
  .then(() => {
    console.log("code ends");
  })
  .catch((err) => {
    console.log("Error!!");
  });
