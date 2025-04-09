//Closure is feature where an inner function has
//access to the outer (enclosing) function's variables
//even after the outer function has excuted


// import data from '../sampleData.json' assert{type:'json'};

const username='pragushpathi';

function printName(){
    console.log(username);
}
printName();


const name1='Pragushpathi'; // golbal scope


//closure
function outerFunction(){
    const myLocal='selvan';
    console.log('accessing global scope',name1);
    console.log('accessing variable scope',myLocal);
    const innerFunction = ()=>{
        console.log('can i access? function scope?',name1);
    }
}
outerFunction();


function outerFunction1(outerData){
    console.log("-----Running OuterFunction---")
    const innerFunction1 = (insideData)=>{
        console.log('outer_var', outerData);
        console.log('Inner_var',insideData)
    }
    return innerFunction1;
}

const funct= outerFunction1('Outer Outside')
funct('inside variable')

function outerFunction2(outerData){
    const SECRET_KEY = 'PRAGUSHPATHI';
    console.log("-----Running OuterFunction---")
    const innerFunction1 = (insideData)=>{
        console.log('outer_var', outerData);
        console.log('Inner_var',insideData);
        console.log('SECRET',SECRET_KEY);

    }
    return innerFunction1;
}

const funct1= outerFunction2('Outer Outside')
funct1('inside variable')

function points(totalPoints){
    console.log("Function Running");
    
    // const totalPoints=0;
    const addPoints=(add=1)=>{
        return totalPoints+add;
    }
    const removePoints=()=>{
        return totalPoints-1;
    }
    const getPoints=()=>{
        return totalPoints;
    }
    const changePoints=(n)=>{
        return  totalPoints=n;
    }
    return {
        addPoints,
        removePoints,
        getPoints,
        changePoints
    }
}

const table=points(100);
console.log(table.addPoints(120));
console.log(table.removePoints());
console.log(table.getPoints());
console.log(table.changePoints(8));

 
// console.log(phrase)

// The old "var"

function sayHi() {
    if (true) {
        console.log(phrase); 
    }
    var phrase = "Hello";
   
  }
sayHi()