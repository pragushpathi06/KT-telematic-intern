
// let count=1;
// cut:for(let i=0;i<=1;i++){
//     for(let j=0;j<=1;j++){
//             for(let k=0;k<=1;k++){
//                 console.log("hi"+""+count++);
//                 if(k===1) break cut;
//             }
//         // console.log("hi1");
//         // console.log("\n");
//     }
//     // console.log("hi2");
//     // console.log("\n");
// }

const { futimesSync } = require("fs");



// Object

// creating Object

const obj={
    name:'Pragushpathi',
    age : 22,
    obj_behavior: {
                alive:true,
                mark:72,
                hobbies: ['Eating','Sleep','cricket','Football'],
                routine:{
                    morning:'Coffee',
                    afternoon:'Ice tea'
                }
    },
    action: function(){
        console.log("Hi.. dude...");
        return `Time for ${obj.obj_behavior.routine.afternoon}`
    }
}

// console.log(obj["obj_behavior"]);
// console.log(obj.obj_behavior.hobbies[3]);
// console.log(obj.action());
// const person=Object.create(obj);


// person.college='Bit'
// console.log(obj);

// console.log(Object.keys(obj));


// delete obj.action;

// Object.assign(obj,{college:'bit',
//     city:'Madurai'
// })
// const {obj_behavior:myVariable}=obj;

// console.log(myVariable.routine.morning) ;
 

// function behavior({college}){
//     const readlineSync = require('readline-sync');
//     console.log(`${college} is worst one...`);
//     const val=readlineSync.question("type True or false :");
//     return val==false?'Your are the ${college}an':'you are fake';
    
// }
// console.log(behavior(obj));

// for(const val in obj){
//     console.log(obj[val]);
// }

const obj1={
    name:'Atom',
    show:function(){
        const display =() =>{
            console.log(this.name); 
        }
        display();
    }
};
// console.log(obj1.show());

function Person(name){
    this.name=name;
}

// const p1=new Person('mickey');
// console.log(p1.name);

const car={
    carName:'Audi',
    getBrand:function(){
        console.log(this.carName);   
    }
}
// console.log(car.getBrand());

function Person(name, age){
    this.name=name;
    this.age=age;
    this.greets =function(){
        return `hello my name is ${this.name} and i am ${this.age} years old`
    }
}
const p1=new Person('pragush',22);
const p2=new Person('michael jackson',66);

// console.log(p2.greets());


// Optional Chaining

// const user = {
//     name:'Alice',
//     address:{
//         city:'madurai'
//     }
// }

// console.log(user.address.city);
// // console.log(user.contact.email);

// console.log(user?.address?.city);
// console.log(user?.contact?.email);
// console.log(user);

const user=[{name:'pragushpathi'},{name:'madonna sebastian'}] 

// console.log(user?.[0]?.name);
// console.log(user?.[2]?.name);

const clonedObj = structuredClone(user);
// console.log(clonedObj);
// console.log(Object.keys(obj));
// console.log(Object.values(obj));

// const ft=Object.entries(obj)
// console.log(ft);

// console.log(Object.hasOwn(obj, "age"));
const frozenObj = Object.freeze({ name: "Sam" });
console.log(frozenObj.name); 