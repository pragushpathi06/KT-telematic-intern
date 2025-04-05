// 


let arr=[1,2,3,4,5,6];
arr[100]=784;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === undefined) {
    arr.splice(i, 1); 
    i--; 
  }
}
console.log(arr);