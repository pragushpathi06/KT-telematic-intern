
// let count=1;
// for(let i=0;i<=1;i++){
//     cut: for(let j=0;j<=1;j++){
//             for(let k=0;k<=1;k++){
//                 console.log("hi"+""+count++);
//                 if(k===1) break cut;
//             }
//         console.log("hi1");
//         console.log("\n");
//     }
//     console.log("hi2");
//     console.log("\n");
// }




// // Object

// creating Object

// const obj={
//     name:'Pragushpathi',
//     String : 22,
//     obj_behavior: {
//                 alive:true,
//                 mark:72,
//                 hobbies: ['Eating','Sleep','cricket','Football'],
//                 routine:{
//                     morning:'Coffee',
//                     afternoon:'Ice tea'
//                 }
//     },
//     action: function(){
//         console.log("Hi.. dude...");
//         return `Time for ${obj.obj_behavior.routine.afternoon}`
//     }
// }
// console.log(obj.String);


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

// const obj1={
//     name:'Atom',
//     show:function(){
//         const display =() =>{
//             console.log(this.name); 
//         }
//         display();
//     }
// };
// console.log(obj1.show());

// function Person(name){
//     this.name=name;
// }

// const p11=new Person('mickey');
// console.log(p1.name);

// const car={
//     carName:'Audi',
//     getBrand:function(){
//         console.log(this.carName);   
//     }
// }
// // console.log(car.getBrand());

// function Person(name, age){
//     this.name=name;
//     this.age=age;
//     this.greets =function(){
//         return `hello my name is ${this.name} and i am ${this.age} years old`
//     }
// }
// const p1=new Person('pragush',22);
// const p2=new Person('michael jackson',66);

// console.log(p2.greets());


// // Optional Chaining

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

// const user21=[{name:'pragushpathi'},{name:'madonna sebastian'}] 

// console.log(user?.[0]?.name);
// console.log(user?.[2]?.name);

// const clonedObj = structuredClone(user);
// console.log(clonedObj);
// console.log(Object.keys(obj));
// console.log(Object.values(obj));

// const ft=Object.entries(obj)
// console.log(ft);

// console.log(Object.hasOwn(obj, "age"));
// const frozenObj = Object.freeze({ name: "Sam" });
// console.log(frozenObj.name); 





// Converts an object to a JSON string.
// console.log(JSON.stringify(obj));

// Converts a JSON string back to an object.
// console.log(JSON.parse(obj));

// // Symbol
// //  When creating hidden object properties (e.g., metadata, private data).
// //  When avoiding property name conflicts (especially in libraries).
// //  When customizing JavaScript behaviors (e.g., iterators, custom conversion logic).
// //  Do NOT use Symbols for JSON data (they are ignored in JSON.stringify()

// const ID=Symbol();
//  const user1 ={
//     name:'alice',
//     [ID]:101
//  }
//  console.log(user1.name);
//  console.log(user1[ID]);
//  console.log(user1);

// //  Converting Symbols
// const sym = Symbol("test");
// console.log(String(sym));
// console.log(sym.toString()); 

// // Object to primitive conversion

// // there are three variant s of type conversion, 
// // that happen in various situations . they're called hints

// // string -- toSting() or valueOf()
// // number --valueOf() or toString() 
// // default

// Hint	Method Order
// "string"	obj[Symbol.toPrimitive]("string") → obj.toString() → obj.valueOf()
// "number"	obj[Symbol.toPrimitive]("number") → obj.valueOf() → obj.toString()
// "default"	obj[Symbol.toPrimitive]("default") → obj.valueOf() → obj.toString()


// let user4 = {
//     name: "John",
//     money: 1000,

//     toString() {
//       return `{name: "${this.name}"}`;
//     },
//     valueOf() {
//       return this.money;
//     }
//   };

//   console.log(`{name:'${this.name}'}`);
//   console.log(user4+200);

//   let obj5 = {
//     toString() {
//       return "2";
//     }
//   };
//   console.log(obj5+2);

