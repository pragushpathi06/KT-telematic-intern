import { log } from 'console';
import fs from 'fs';

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
// for (const key in columns1[0] ) {
//     if (Object.prototype.hasOwnProperty.call(object, key)) {
//         const element = object[key];
        
//     }
// }

// console.log(Object.values(columns1.columns[0]));

let arrTemp={
}
for (const element of columns1.columns) {
    if(element?.id === 565386694){

        // console.log(element.id);
        // console.log(element.id.cachedContents);
        // console.log(Object.keys(element));
        // for (const key in element) {
        //     if(Object.keys())
        //     element[key]);
        // }
    }
}

console.log(arrTemp);

