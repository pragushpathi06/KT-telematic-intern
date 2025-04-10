import fs from 'fs';

const rawData = fs.readFileSync(new URL('./sampleData.json', import.meta.url), 'utf8');
const data = JSON.parse(rawData);

const value = data.meta.view.columns;


// for (const element of value) {
//     console.log(element.dataTypeName);  
//     console.log("-----------------------");
    
// }
console.log(value);

/// map
let names = value.map((n) => {
    if(['text','meta_data','point','calendar_date'].includes(n.dataTypeName)){
        n.dataTypeName='number'
    }
    return n;
})

console.log('-----------------------------------------------');

console.log(names);


 for (const element of value) {
    console.log(element.dataTypeName);  
    console.log("-----------------------");
}
// console.log(names)
// filter 
console.log('-----------------------');

let fieldName=value.filter((f) =>f.renderTypeName === 'text' );

// console.log(fieldName);
// console.log('-----------------------');



//reduce
const position= value.reduce((acc,curr) => acc+curr.position,5);

// console.log(position);

console.log('-----------------------');

//for loop
// for(let i=0;i<value.length;i++){
//     console.log(value[i]);
// }

console.log('-----------------------');

// for of
// for (const element of value) {
//     console.log(element);
// }

console.log('-----------------------');
//foreach

const width = value.forEach( val => {
    if(val.width != undefined){
    val.width = val.width+" cm"; 
    console.log(val);
    }
});

console.log('-----------------------');
//find

// console.log(value.find((f) => f.renderTypeName=='meta_data'));

console.log('-----------------------');



//sort 

console.log('-----------------------');

// console.log(value.filter((f) =>f?.width).
//         sort((a,b) =>{
//     const arr1=parseInt(b.width);
//     const arr2=parseInt(a.width);
//     return arr2-arr1;
// }
// ));


