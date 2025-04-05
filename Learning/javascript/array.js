// import { log } from 'console';
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
// console.log(Object.values(columns1.columns[0]));

let arrTemp
for (const element of columns1.columns) {
    if(element?.id === 565386694 && element?.cachedContents){
        for (const key in element?.cachedContents) {
             if(key==='top') {
                  arrTemp=element?.cachedContents[key];
                  for (const ele1 in arrTemp) {
                    if(arrTemp[ele1].count === '4085') {
                    arrTemp[ele1].count='23423424';
                    console.log(arrTemp);
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
console.log('Array as string using .toString() -', val);

console.log('------');
console.log("Join array with '-' using .join() - " ,name().join(' and '));

let name2 =()=>{
    for (const key of array) {
        // console.log(key);
        if(key?.tags) return (Object.values(key.tags));
        // console.log('-----');
    }
};

console.log('------');
let joining=name().concat(name2());
console.log("Concatenate arrays using .concat() - " +joining);

console.log('-----');
console.log("Using .splice() to replace 1 item at index 1 - Removed: " +joining.splice(1,5));

console.log('-----');
console.log("Using .slice() from index 1 to 5 - " +joining.slice(1,5));
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
console.log("Flatten array using .flat() -",joining.flat());
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
console.log("Mapped array replacing values starting with 'p' -",names);

console.log('-----------');

let posts=[
    {title:'post 1', author: 'Dan'},
    {title:'post 2', author: 'Dan'},
    {title:'post 3', author: 'Sarah'},
];
let danPost=posts.filter((p)=>p.author === 'Sarah');
console.log("Filter posts where author is Dan -",danPost);

console.log('-----------');
let num=[1,2,3,4,5,6,7];
console.log("Sum using .reduce() - " ,num.reduce((total,current)=> total+current));
console.log("Sum with initial value 10 using .reduce() - " ,num.reduce((total,current)=> total+current,10));


console.log('-----------');
console.log(num.every((a) => a>0));

console.log('------------');
let karr =[... arrTemp];
console.log(karr);



console.log('------------');
console.log(
    "First item > 3 using .find() - " ,
    karr.find((s)=> s.item === 'Pembina')
);


console.log('------------');
console.log(karr.push( { item: 'International Falls', count: '4158' }));
console.log(karr);
console.log('------------');
console.log(karr.pop());
console.log(karr);
console.log('------------');
console.log(karr.unshift({ item: 'International Falls', count: '4158' }));
console.log(karr);
console.log('------------');
console.log(karr.shift());
console.log(karr);
console.log('------------');


//iterables

let print1=(start=0, end=10,step=1)=>{
    let current =start;
    return {next:() =>{
        if(current<end){
            let val=current;
            current +=step;
            return {
                val, done:false 
            }
        }
        else{
            return {
                val: undefined,done:true
            }
        }
    }
  }
}

const iter = print1(4,100,3);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());