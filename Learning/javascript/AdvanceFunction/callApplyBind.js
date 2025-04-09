// Decorators - Add behavior to classes/methods/fields
// Forwarding - Pass arguments to another function transparently

// function log(target, key, descriptor) {
//     const original = descriptor.value;
  
//     descriptor.value = function(...args) {
//       console.log(`Calling ${key} with`, args);
//       return original.apply(this, args);
//     };
  
//     return descriptor;
//   }
  
//   class Calculator {
//     // @log
//     add(a, b) {
//       return a + b;
//     }
//   }
  
//   const calc = new Calculator();
//   calc.add(2, 3); 

//   not supported out of the box in most environments like Node.js

// call apply bind method

let name1={
    firstname:'pragush',
    lastname:'pathi',
    printName: function (homeTown,states){
        console.log(this.firstname+""+this.lastname+" from "+homeTown+" "+states);
    }
}

console.log(name1.printName("Madurai",'TamilNadu'));

let name2={
    firstname:'madonna',
    lastname:'sebastian'
}

//function borrowing

console.log("-------- function borrow ------\n");
name1.printName.call(name2,'kochi','kerala');

// apply method
console.log("-------- apply method ------\n");
name1.printName.apply(name2,['kochi','kerala']);

// bind method
console.log("-------- bind method ------\n");

let printName = name1.printName.bind(name2,'kochi','Kerala');

printName()
