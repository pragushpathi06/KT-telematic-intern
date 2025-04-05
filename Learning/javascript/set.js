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
    let name =()=>{
        for (const key of array) {
            // console.log(key);
            if(key?.flags) return (Object.values(key?.flags));
            // console.log('-----');
        }
    };