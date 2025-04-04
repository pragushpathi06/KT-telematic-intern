const object1={
    name:"pragushpathi",
    age:22,
    college:'BIT'
}
const user= object1
// Object.assign(user,object1);
console.log(user === object1);

object1.age=55;

const user2=structuredClone(object1)
// console.log(user.age);
user2.age=60;

console.log(user2.age);
console.log(object1.age);

