let john = { name: "John" };

let array = [ john ];

john = null; 
console.log(array[0]);
console.log(john);


const weakMap = new WeakMap();
let user = {
     name: "Pragushpathi" 
    };

weakMap.set(user, "Logged In");

// weakMap.set(key, value)
// weakMap.get(key)
// weakMap.delete(key)
// weakMap.has(key)

console.log(weakMap.get(user)); 
user = null;
console.log(weakMap.get(user)); 


