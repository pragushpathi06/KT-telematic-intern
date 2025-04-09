// Rest parameters = (..rest) allow a function work with a variable
// number of arguments by bundling them into an array

//Spread = expands an array into separate elements
// rest = bundles separate elements into an array

function sum(...number){
    let result = 0;
    for(let numbers of number){
        result+=numbers;
    }
    return result;
}
function getAverage(...number){
    let result=0;
    for (const numbers of number) {
        result+=numbers;
    }
    return result/number.length;
}

const number=[34,35,43,23,1,5,6];
const total=getAverage(34,35,43,23,1,5,6);
const sum1=sum(34,35,43,23,1,5,6);
console.log('Calculating total and sum',total,sum1);

console.log("max number in array",Math.max(...number));
console.log("min number in array",Math.min(...number));

let username='pragushpathi';
let letters=[...username];
console.log(letters)
console.log(letters.join(''));





function openFridge(...foods) {
    console.log(foods);
    
}
const food1 = 'pizza';
const food2 = 'burger';
const food3 = 'pasta';
const food4 = 'sushi';
const food5 = 'tacos';
const food6 = 'biryani';
const food7 = 'noodles';
const food8 = 'sandwich';
const food9 = 'salad';
const food10 = 'steak';

const foods = ['ramen', 'dumplings', 'falafel', 'paella', 'shawarma', 'lasagna', 'hotdog', 'idli', 'pho', 'kebab'];

openFridge(food1, food2, food3, food4, food5, food6, food7, food8, food9, food10);
openFridge(...foods);

console.log(openFridge(...foods, food1, food2, food3, food4, food5, food6, food7, food8, food9, food10));


