// import { log } from 'console';
import fs from 'fs';
import { log } from 'util';

const rawData1 = fs.readFileSync(new URL('../javascript/sampleData.json', import.meta.url), 'utf8');
const sampleData = JSON.parse(rawData1);
// console.log(Object.keys(sampleData));

const clone= structuredClone (sampleData.meta.view);
// console.log(Object.keys(clone));
 

const arr=()=>{
const tempArr=[]    
for(const key in clone) {
    if(Array.isArray(clone[key])){
        // console.log(key +" "+clone[key]);
        tempArr.push({[`${key}`]:clone[key]});
        // console.log('------');
      }
    }
    return tempArr;
}
// console.log(array);

const array=arr();
for (const ele of array) {
    if(ele?.flags){
        ele.flags[0]='Manual'; 
    }
}
// console.log(array);
 
// console.log(Object.keys(clone));
const countNum=()=>{
    let temp={}
    for (const key in clone) {
        if(key === 'columns'){
            Object.assign(temp,{[`${key}`]:clone[key]})
        }                
    }
    return temp;
}

const columns1=countNum();
// for (const key in columns1[0]) {
//     if(ele?.id === 565386694){
//         console.log(true);
//     }
// }
// console.log(Object.values(columns1.columns[0]));


for (const element of columns1.columns) {
    if(element?.id === 565386694 && element?.cachedContents){
        for (const key in element?.cachedContents) {
             if(key==='top') {
                  let arrTemp=element?.cachedContents[key];
                  for (const ele1 in arrTemp) {
                    if(arrTemp[ele1].count === '4085') {
                    arrTemp[ele1].count='23423424';
                    // console.log(arrTemp);
                    }
                }
            }
        }
    }
}



// 17 Array method 
// .toString();
// .join();
// .concat();
// .splice();
// .slice();
// .indexOf();
// .lastIndex();
// .foreach();
// .map();
// .filter();
// .reduce();
// .some();
// .every();
// .flat();
// .find();
// .findindex();
// .sort();

let name =()=>{
    for (const key of array) {
        // console.log(key);
        if(key?.flags) return (Object.values(key?.flags));
        // console.log('-----');
    }
};
// console.log(Object.keys(name));
console.log(name());

let val= name().toString();
console.log(val);

console.log('------');
console.log(name().join(' and '));

let name2 =()=>{
    for (const key of array) {
        // console.log(key);
        if(key?.tags) return (Object.values(key.tags));
        // console.log('-----');
    }
};

console.log('------');
let joining=name().concat(name2());
console.log(joining);

console.log('-----');
console.log(joining.splice(1,5));

console.log('-----');
console.log(joining.slice(1,5));
console.log(joining);
console.log(joining.splice(1,2,'pragushpathi'));
console.log(joining);


console.log('------');
let nameCopy=[... joining]
console.log(nameCopy === joining);
console.log('------');

console.log(joining.indexOf('pragushpathi'));
joining.push('pragushpathi');

console.log(joining.lastIndexOf('pragushpathi'));
console.log('------');


joining.push(nameCopy);
console.log(joining);
console.log(joining.flat());
joining=joining.flat();

console.log('------');
joining.forEach(n=>{
    if(n.charAt(0)==='p'){
    console.log(n);
    }
})

console.log('------');
let names = joining.map((n) => {
    if (n.charAt(0) === 'p') {
      return 'Pragushpathi';
    }
    return n;
  });
console.log(names);

  




 