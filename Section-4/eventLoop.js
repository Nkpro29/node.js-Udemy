const fs = require("fs"); //module is required
const crypto = require("crypto");
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => {
  console.log("timer finished");
});
setImmediate(() => {
  console.log("immediate finished");
});

console.log("top-level finished");

fs.readFile("./txt/start.txt", () => {
  console.log("I/O finished");

  console.log("-------------");

  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 5000);
  setImmediate(() => {
    console.log("immediate 2 finished");
  });

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});
