let arr = ["Pragushpathi","kumar"];

// __proto__ and it chain

let object = {
    name:"Pragushpathi",
    city:'Madurai',
    getIntro:function(){
        console.log(this.name+"from"+this.city);
    }
}
let object2={
    name:'Suresh'
}

  object2.__proto__= object;

  console.log(object2);
  


class Animal {
    speak() {
      console.log("Animal speaks");
    }
  }
  
  class Dog extends Animal {
    bark() {
      console.log("Dog barks");
    }
  }
  const myDog = new Dog();
  myDog.speak(); 
  myDog.bark();  
  
 
  const person = {
    greet() {
      console.log("Hello!");
    }
  };
  
  const student = {
    study() {
      console.log("Studying...");
    }
  };
  
  student.__proto__ = person;
  
  student.greet();


  function Car(make, model) {
    this.make = make;
    this.model = model;
  }
  
  Car.prototype.drive = function () {
    console.log(`Driving ${this.make} ${this.model}`);
  };
  
  const myCar = new Car("Toyota", "Camry");
  
  myCar.drive(); 
  
  Car.prototype.honk = function() {
    console.log("Beep!");
  };
  
  myCar.honk(); 


  function F() {}

  console.log(F.prototype);

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    
    greet() {
      console.log(`I'm ${this.name} and I'm ${this.age} years old.`);
    }
  }
  

  class Student extends Person {
    constructor(name, age, course) {
      super(name, age);
      this.course = course;
    }
  
   
    study() {
      console.log(`${this.name} is studying ${this.course}.`);
    }
  }
  const s1 = new Student("Pragushpathi", 22, "JavaScript");
  
  s1.greet(); 
  s1.study();
  
  console.log(s1 instanceof Student); 
  console.log(s1 instanceof Person);  
  
  
