// Native prototypes
const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype); 

const name1 = "Pragush";

console.log(name1.toUpperCase());

console.log(name1.__proto__ === String.prototype);


Array.prototype.last = function() {
    return this[this.length - 1];
};

const name2 = ["pragushpathi",'emma stone','samantha','madonna sebastian','priya Mohan'];
console.log(name2.last()); 

const numbers = [10, 20, 30, 40];
console.log(numbers.last()); 

const cleanObj = Object.create(null);

console.log(cleanObj.toString);
console.log(cleanObj.hasOwnProperty);

const dictionary = Object.create(null);
dictionary["key"] = "value";

// .prototype	- Functions	 - Defines what will be inherited by instances
// __proto__	- All objects - Points to the object's prototype
