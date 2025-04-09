import fs from 'fs';

const rawData = fs.readFileSync(new URL('../sampleData.json', import.meta.url), 'utf8');
const data = JSON.parse(rawData);

// console.log(data);
// console.log(data.meta.view.owner);

const owner=structuredClone( data.meta.view.owner);

console.log(owner);


let employee={};

employee.title='KTT';

console.log(Object.getOwnPropertyDescriptor(employee,'title'));

Object.defineProperty(employee,'age',{
    value:21,
    writable:false,
    configurable:true,
    enumerable:true
});


// writable is false we can not reassign or modify the value 



console.log(Object.getOwnPropertyDescriptor(employee,'age'));
// employee.age=20;
console.log(employee); 
 
// enumerables is false it doesn't show key or value in looping 
for (const key in employee) {
    console.log(key);
}

// Object.defineProperty
Object.defineProperty(employee,'age',{
    enumerable:false
})
console.log("---After change enumerables false---");
for (const key in employee) {
    console.log(key);
}

//Object.defineProperties
Object.defineProperties(employee,{
    lastname:{
        value:'Prakash',
        writable:true,
        enumerable:true,
        configurable:true
    }
})
console.log(Object.getOwnPropertyDescriptor(employee,'lastname'));

// Object.seal - it configure all value to false (we can modify the property)

Object.seal(employee);
employee.title='KT Telematic';

// delete employee.title
// employee.frdName='Suresh'

console.log(employee.title);
console.log(employee.frdName);


// Object.freeze - we cant modify the object values

// for (const key in owner) {
//     console.log(key);
    
// }


console.log(owner.id);
owner.id="ej86-bbb4"
console.log('change key value---'+owner.id);
Object.freeze(owner);
try {
    owner.id = "ej86-wwb4";
    console.log("After freeze method---" + owner.id);
  } catch (error) {
    console.error("Cannot modify a frozen object---", error.message);
  }

// Object.preventExtensions -- prevent from add new key value

Object.preventExtensions(owner);

try{
    Object.assign(owner,{
        userName:'pragushpathi'
    });
}
catch(error){
    console.log("you cannot add key-value ---",error.message);
}

console.log(Object.isExtensible(employee));
console.log(Object.isSealed(owner));
