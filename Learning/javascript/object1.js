import fs from 'fs';


const rawData1 = fs.readFileSync(new URL('../javascript/sampleData.json', import.meta.url), 'utf8');
const sampleData = JSON.parse(rawData1);
console.log(Object.values(sampleData))

const view = structuredClone(sampleData.meta.view);
console.log(view);


for (const i in view) {
    if(Array.isArray(view[i])){
    for (const ele of view[i]) {
        console.log(i+" "+ele);
    }
    console.log('\n')
}
}


