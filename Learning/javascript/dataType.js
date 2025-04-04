// Methods of primitives

// There are 7 primitive types: string, number, bigint, 
// boolean, symbol, null and undefined.4

let billion=100000000;

let billion1=1_000_000_000;

let billion2=1e20;
console.log(billion2);
console.log(7.3e9);

console.log(1e3 === 1*100);
console.log(1.23e6 === 1.23*1000000);

// -3 divides by 1 with 3 zeroes
console.log(1e-3 === 1 / 1000); 

// hexadecimal
console.log(0xff);

let a = 0b11111111; 
let b = 0o377;

let num1 = 42;       // Integer
let num2 = 3.14;     // Floating-point number
let num3 = 1e3;      // Exponential notation (1000)
let num4 = 0b1010;   // Binary (10 in decimal)
let num5 = 0o52;     // Octal (42 in decimal)
let num6 = 0x2A;     // Hexadecimal (42 in decimal)

console.log(num1+num6);

let num12= 100n;
console.log(num1, num2, num3, num4, num5, num6);
// Checking Number Type
console.log(typeof 42);    //  number"
console.log(typeof 3.14);  // "number"



// // Special Numeric Values
// console.log(1 / 0);        //  Infinity
// console.log(-1 / 0);       //  - Infinity
// console.log("abc" * 5);    //  NaN 

// // To check if a value is NaN or finite
// console.log(isNaN("abc" * 5)); 
// console.log(isFinite(42));     
// console.log(isFinite(Infinity)); 

// Number Limits
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);

function calculateFinalPrice(p, d, t) {
    let discountAmount = (p * d) / 100;
    let priceAfterDiscount = p - discountAmount;

    let taxAmount = (priceAfterDiscount * t) / 100;
    let finalPrice = priceAfterDiscount + taxAmount;

    return finalPrice.toFixed(2); 
}


// let price = 1000;       
// let discount = 10;      
// let tax = 5;            

// console.log("Final Price: " + calculateFinalPrice(price, discount, tax));

// function EMI(p,r,n){
//     let monthlyRate = r / 12 / 100;
//     return ((p*monthlyRate*(Math.pow(1+monthlyRate,n)))/((Math.pow(1+monthlyRate,n))-1)).toFixed(2)
// }
// // let loanAmount=500000;
// // let interestRate=7.5;
// // let tenure=60;
// console.log("Monthly EMI: "+EMI(500000,7.5,60));


// function generateOTP() {
//     return Math.floor(1000 + Math.random() * 9000);
// }

// console.log("Your OTP is: " + generateOTP());


// console.log(Math.round(4.6)); 
// console.log(Math.trunc(7.8));  
// console.log((3.14159).toFixed(2));  

// // Math.floor(x) - pagination
// console.log(Math.floor(4.9)); 
// console.log(Math.floor(7.1)); 
// console.log(Math.floor(-2.8));

// // Math.ceil(x) - billing calculation
// // console.log(Math.ceil(4.1));  
// // console.log(Math.ceil(7.9));  
// // console.log(Math.ceil(-2.3)); 

//  Math.round(x)
// console.log(Math.round(4.4));  
// console.log(Math.round(4.5));  
// console.log(Math.round(4.9));  
// console.log(Math.round(-2.5)); 
// console.log(Math.round(-2.6)); 


// Math.trunc(x)
console.log(Math.trunc(4.9));  
console.log(Math.trunc(7.1));  
console.log(Math.trunc(-2.8)); 
