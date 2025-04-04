
// Quotes
const singleQuote = 'Hello World!'
const doubleQuote = "Hello World!"
const backTick = `Hello World!`

const multiLine = `Hello World!
This is a multi-line string.
This is the second line.`

console.log(multiLine);
console.log(singleQuote);
console.log(doubleQuote);

let username="Pragushpathi";
let greeting=`Hello ${username}`;
console.log(greeting);

// Method in String
let username1="Pragushpathi ";


console.log("length of the string -"+ " " +username1.length);
console.log("----------");

console.log("Convert string in lowercase -"+username1.toLowerCase());
console.log("----------");

console.log("Convert string in lowercase -"+username1.toUpperCase());
console.log("----------");

console.log("get value by accessing index - "+username1.charAt(0));
console.log("----------");

console.log("get value by accessing index - "+username1.charAt(1));
console.log("----------");

console.log("get index no of a character in string - "+username1.indexOf('a'));
console.log("----------");

console.log("get index no of a character in string - "+username1.lastIndexOf('a'));
console.log("----------");

console.log("find index of 'h' after position 7 - " + username1.indexOf('h', 7));
console.log("----------");

console.log("find last index of 'h' before position 7 - " + username1.lastIndexOf('h', 7));
console.log("----------");

console.log("replace first occurrence of 'a' with 'A' - " + username1.replace('a', 'A'));
console.log(username1.replaceAll('h','H'));

console.log("----------");

console.log("repeat string 4 times - " + username1.repeat(4) + " ");
console.log("----------");

console.log("extract substring from index 0 to 5 - " + username1.slice(0, 5));
console.log(username1.slice(0,7));
console.log(username1.slice(7));

console.log("----------");

console.log("pad '3.14' with zeros at the start to make length 6 - " + ('3.14').padStart(6, '0'));
console.log("pad '3.14' with zeros at the end to make length 6 - " + ('3.14').padEnd(6, '0'));
console.log("----------");

console.log("trim spaces from both ends of string - " + username1.trim());
console.log("trim spaces from the start of string - " + username1.trimStart());
console.log("trim spaces from the end of string - " + username1.trimEnd());
console.log("----------");

console.log("split string by 'a' - " +  username1.split('a'));
console.log(username1.split('h'))
console.log("----------");
 
console.log(username1.includes("v"));

