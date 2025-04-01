// // // let user=[{name:'pragush',city:'madurai',college:'bit'},
// // //     {name:'emma stone',city:'USA',college:'bit'},
// // //     {name:'samantha',city:'madurai',college:'bit'},
// // //     {name:'madonna sebastian',city:'kochin',college:'bit'},
// // //     {name:'priya Mohan',city:'chennai',college:'bit'},];
// // //     // for(let val=0;val<user.length;++val){
// // //     //     let temp = user[val];
// // //     //     console.log(temp);
// // //     // }
// // //     // console.log("break---------");
// // //     // console.log("break---------");
// // //     // for (const temp of user) {
// // //     //     console.log(temp);
// // //     // }
// // //     // console.log("break---------");
// // //     // for(const temp in user){
// // //     //     console.log(temp);
// // //     // }
// // // //     console.log("break---------");
// // // //      user.forEach(()=>{
// // // //     console.log(user)
// // // //   })
// // // //   let user1={name:'pragush',city:'madurai',college:'bit',
// // // //     name1:'emma stone',city:'USA',college:'bit',
// // // //     name:'samantha',city:'madurai',college:'bit',
// // // //     name:'madonna sebastian',city:'kochin',college:'bit',
// // // //     name:'priya Mohan',city:'chennai',college:'bit'};
// // // //   console.log("break---");
// // // //   for(const i in user1){
// // // //     console.log(user1[i]);
// // // //   }

// // // // for(const val of user){
// // // //     for(const val1 in val){
// // // //         console.log(`key "${val1}" and value "${val[val1]}" `);
// // // //     }
// // // //     console.log(" ---break----")
// // // // }
// // // for(let val of user){
// // //     const [key,value,value1] = Object.entries(val);
// // //     console.log(key);
// // //     console.log(value);
// // //     console.log(value1);
// // // }
// // // let num=[1,2,3,4,5];

// // // num.forEach(display);
// // // num.forEach(double);
// // // function double(element,index,array){
// // //     array[index]=element*2;
// // // }
// // // function display(element){
// // //     console.log(element);
// // // }


// const url = "https://dragonball-api.com/api/characters";
// let arr = [];

// fetch(url)
//     .then(response => response.json()) 
//     .then(data => {
//         arr = data;
//         arr.forEach(character => console.log(character.name));
//     })
//     .catch(error => console.error("Error fetching data:", error));
  
// const day=-2;
// switch (day){
//     case 1:
//         console.log("Monday");
//         break;
//     case 2:
//         console.log("Tuesday");
//         break;
//     case 3:
//         console.log("Wednesday");
//         break;
//     case 4:
//         console.log("thursday");
//         break;
//     case 5:
//         console.log("Friday");
//         break;
//     case 6:
//         console.log("saturday");
//         break;
//     case 7:
//         console.log("Sunday");
//         break;
//     default:
//         console.log("pls provide valid number range between 1 to 7")    
// }


const od_or_ev= function (n){
    return n%2==0?"even": "odd";
}
console.log(od_or_ev(4));

const fact=function(n){ 
    return n<2?1:n*fact(n-1);
}
console.log(fact(6));

let a=10;
let b=9;
let c=a+b;
console.log(c);
// closures
// function names(userId,names){
//     function display(){
//         console.log(`user id ${userId} and name ${names}`);
//     }
//     return display;
// }
// console.log(names());

// function outside() {
//     const x = 5;
//     function inside(x) {
//       return x * 2;
//     }
//     return inside;
//   }
  
//   console.log(outside()(1)); 
//   function myConcat(sep) {
//     let result = ""; 
//     for (let i = 1; i < arguments.length; i++) {
//       result += arguments[i] +sep;
//     }
//     return result;
//   }
//   console.log(myConcat(", ", "red", "orange", "blue"));

// let arr=[1,2,3,4,5,6];
// const power=arr.map((element)=>
//     Math.pow(element,2)
// );
// console.log(power);
// console.log(arr);

// const evenNo=arr.filter((val)=> val%2 === 0)
// console.log(evenNo);

// const oddNo=arr.filter((val)=> val%2 !== 0)
// console.log(oddNo);

// function makeRangeIterator(start = 0, end = Infinity, step = 1) {
//     let nextIndex = start;
//     let iterationCount = 0;
  
//     const rangeIterator = {
//       next() {
//         let result;
//         if (nextIndex < end) {
//           result = { value: nextIndex, done: false };
//           nextIndex += step;
//           iterationCount++;
//           return result;
//         }
//         return { value: iterationCount, done: true };
//       },
//     };
//     return rangeIterator;
//   }
  
//   const iter = makeRangeIterator(1, 10, 2);

// let result = iter.next();
// while (!result.done) {
//   console.log(result.value); // 1 3 5 7 9
//   result = iter.next();
// }

// console.log("Iterated over sequence of size:", result.value); // [5 numbers returned, that took interval in between: 0 to 10]
