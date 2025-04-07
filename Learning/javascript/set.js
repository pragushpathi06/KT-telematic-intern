import fs from 'fs';


const rawData1 = fs.readFileSync(new URL('../javascript/sampleData.json', import.meta.url), 'utf8');
const sampleData = JSON.parse(rawData1);

const clone= structuredClone (sampleData.meta.view);
const arr=()=>{
    const tempArr=[]    
    for(const key in clone) {
        if(Array.isArray(clone[key])){
            // console.log(key +" "+clone[key]);
            tempArr.push({[`${key}`]:clone[key]});
            // console.log('------');
          }
        }
        return tempArr;
    }
    const array=arr();
    const tagsObject = array.find(obj => obj.hasOwnProperty('tags'));
    console.log(tagsObject?.tags);


const tagData = new Set(tagsObject.tags);

console.log(tagData);

console.log('------------');
console.log('Add a new value\n');
tagData.add('airplanes');
console.log(tagData.has('airplanes')); 

console.log('------------');
console.log('Remove a value from tagData Set\n');
tagData.delete('buses');
console.log(tagData.has('buses')); 

console.log('------------');
console.log('Get iterator of [value, value] pairs\n');
for (let entry of tagData.entries()) {
    console.log(entry); 
  } 

console.log('------------');
console.log('has() – Check if a tag exists\n');
console.log(tagData.has('trucks')); // true
console.log(tagData.has('bikes'));  // false


console.log('------------');
console.log(' Loop over all tags\n');
tagData.forEach(tag => {
    console.log(` Tag: ${tag}`);
  });
