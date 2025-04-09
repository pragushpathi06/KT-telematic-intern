// Scheduling: setTimeout and setInterval

// setTimeout

function name1(){
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
}

setTimeout(name1, 5000);

// with argument
setTimeout((greeting,username) => {
    for (let i = 0; i <10; i++) {
        console.log(greeting +" "+username);
    }
}, 5000,"hello" , 'pragushpathi');

let count=0
let id = setInterval(() => {
    count++;
    console.log(count);
},1000);

setTimeout(()=> clearInterval(id),10000);

// clearInterval(id);
