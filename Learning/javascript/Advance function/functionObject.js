// name Property

function user(){
    console.log("pragushpathi");
}
console.log(user.name);

let greet = function what(){
    console.log('pragush');
}
console.log(greet.name);

// Function Inside a Function: Named Function Expression (NFE)

let val=function func(who){
    if(who){
        console.log(`hello, ${who} , ${who}`);
    }
    else{
        func('Guest');
    }
}
val()

let wel=val;
val=null;
wel();

function sum(a) {
    let total = a;

    function inner(b) {
        total += b;
        return inner;
    }

    inner.toString = function () {
        return total;
    };

    return inner;
}
console.log(Number(sum(1)));



// The "new Function" syntax

let sum1= new Function('a', 'b', 'return a + b');

console.log( sum1(1, 2) );

function getFunc() {
    let value = "test";
  
    let func = new Function(console.log(value));
  
    return func;
}
  
  try{
    getFunc()();
  }
  catch{
    console.log('Not working')
  }


  function getFunc1() {
    let value = "test";
  
    let func = function (){ 
        console.log(value)
    };
  
    return func;
}

try{
    getFunc11()();
  }
  catch{
    console.log('Not working')
  }
