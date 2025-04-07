let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john);
visitedSet.add(pete);
visitedSet.add(john);

console.log(visitedSet.has(john));
console.log(visitedSet.has(mary));
john = null;
console.log(visitedSet.has(john));
console.log(visitedSet.has(mary));

// Destructuring assignment

// In array

let arr = ["John", "Smith"];
let [firstName, surname] = arr;

console.log(firstName);
console.log(surname);

let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
  
  let {title, width, height} = options;
  

  console.log(title);
  console.log(width);
  console.log(height);

  let options1 = {
    title1: "Menu"
  };
  
  let {width1 = 100, height1 = 200, title1} = options;
  
  console.log(title1);
  console.log(width1);
  console.log(height1);


console.log(`Array	const [a, b] = [1, 2];
Object	const {x, y} = obj;
Nested	const {a: {b}} = obj;
Function Args	function({x, y}) { ... }
`)

const vehicle = {
    type: "Car",
    brand: "Toyota",
    specs: {
      color: "Red",
      year: 2021
    }
  };
  
  
  const {type, brand}=vehicle;
  const {color ,year} =vehicle.specs;

  console.log(type);   
  console.log(brand);  
  console.log(color);

  const sensorData = {
    id: "SENSOR-01",
    state: "active",
    readings: {
      temperature: 28.5,
      humidity: 60,
      pressure: 1012
    }
  };

  const {id,state,readings:{temperature,humidity,pressure}} =sensorData;
  console.log(temperature);   
  console.log(humidity);  
  console.log(pressure);
  
console.log(`Sensor ${id} is ${state}`);
console.log(`Temp: ${temperature}°C, Humidity: ${humidity}%`);

// Date and time

// new Date()
let now = new Date();
console.log("Time and Date - "+now);


let Jan01_1970 = new Date(0);
console.log(Jan01_1970 );

let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 );

console.log(now.setFullYear(2030, 5, 10));

// new Date(year, month, date, hours, minutes, seconds, ms)

// JSON methods, toJSON


// JSON.stringify to convert objects into JSON.
// JSON.parse to convert JSON back into an object.


let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
  };

  let json = JSON.stringify(student);

console.log("checking the type of it",(typeof json)); // we've got a string!


fetch('./sampleData.json')
  .then(response => response.json())
  .then(student => {
    console.log(student);
    console.log(`Name: ${student.name}, Department: ${student.department}`);
  })
  .catch(error => console.error('Error loading JSON:', error));