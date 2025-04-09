const sayHello =(name ,greeting) => console.log(`${greeting} ${name}`); 


const data={
    name1:'Prgushpathi',
    role:'Intern',
    exp:1,
    show: function() {
        let self=this;
        setTimeout(function(){
            console.log(`The name is ${self.name1}\nThis role is ${self.role}`)
        },3000);
    },
    show1: function(){
        this.sete = setInterval(() => {
            console.log(`The name is ${this.name1}\nThis role is ${this.role}`);
        },2000);
    }
}
data.show()
data.show1() 
setTimeout(() => {
    clearInterval(data.sete);
    console.log("Interval cleared");
}, 10000);

sayHello('Pragushpathi','Good Afternoon');
