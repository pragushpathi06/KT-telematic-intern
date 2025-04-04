// import data from '../javascript/rows1.json' assert{ type:'json'};

// console.log(data);

import fs from 'fs';

const rawData = fs.readFileSync(new URL('../javascript/rows1.json', import.meta.url), 'utf8');
const data = JSON.parse(rawData);

console.log(Object.keys(data)); 

const entries1=Object.entries(data);
console.log(entries1);
for(let i in data.meta.view){
    console.log(i);
}
Object.entries(data.meta.view).forEach(([key,value] )=> {
    console.log(`key :${key} , value  :${value}`);
})

console.log("---------------------\nListing all keys and values from data");

console.log(
    Object.keys(data)
);


for (const key in data.data) {
    for (const element in key) {
        console.log(element);
    } 
}
console.log(data.meta);
for (const ele of data.meta.v) {
    console.log(ele);
}

console.log(Object.keys(data.meta.view));
console.log(Object.values(data.meta.view.columns));

const col=Object.entries(data.meta.view.columns);

for (let index = 0; index < col.length; index++) {
     if(index < 5){
        console.log(col[index]);
     }
}

console.log( typeof col);
console.log(col);


