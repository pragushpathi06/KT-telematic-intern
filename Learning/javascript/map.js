const myArray=[1,2,3,4,5,6,7];


// new Map()	Creates a new Map object
const map1=new Map();

// for insection 

console.log("----------------------");
map1.set('a',1);
map1.set('b',2);
map1.set('c',3);

console.log("----------------------");
console.log(map1.get('a'));
console.log(map1.get('b'));

console.log("----------------------");
map1.set('a',97);

console.log(map1.get('a'));
console.log("----------------------");
console.log(map1.size)
console.log("----------------------");
const sensorData = new Map();

// inserting:

//inserting value in sensor ma
sensorData.set("TemperatureSensor1", "28.5°C");
sensorData.set("HumiditySensor1", "62%");
sensorData.set("MotionSensor3", "Active");

console.log(sensorData);
console.log("----------------------");
sensorData.set("TemperatureSensor1", "29.1°C");
console.log('Get the current value of a sensor',sensorData.get("TemperatureSensor1"));

console.log("----------------------");
console.log('Remove a sensor from the system');

sensorData.delete("MotionSensor1");
console.log('Remove a sensor from the system',sensorData);
console.log("----------------------");
console.log("Remove a sensor from the system");
for(let [sensorKey,value] of sensorData){
    console.log(`${sensorKey} => ${value}`)
}

console.log("----------------------");

console.log("Check if a sensor is active in the system");


console.log(sensorData.has("HumiditySensor1"))
  
console.log("----------------------");

console.log(sensorData);

console.log("----------------------");
console.log("printing all keys present in map \n");

for (const x of sensorData.keys()) {
    console.log(x)
  }
console.log("----------------------");
console.log("printing all values present in map\n");

for (const x of sensorData.values()) {
    console.log(x)
}
console.log("----------------------");
console.log(sensorData.entries());

