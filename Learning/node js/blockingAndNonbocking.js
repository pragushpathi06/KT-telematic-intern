const fs=require('fs');


console.log("1");

//non - blocking
const req=fs.readFile("./output.txt",'utf8',(err,req) => {
    console.log(req +" HIII");
})

//blocking
const request =fs.readFileSync('./output.txt','utf8');
console.log(request);

console.log("2");

console.log("3");



