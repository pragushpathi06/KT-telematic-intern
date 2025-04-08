function print(n1,n){
    if (n===0) return 1;
    print(n1,n-1);
    console.log(n1*n);
    return ;
}

function factorial(n){
    return n==0?1:n*factorial(n-1);
}
console.log(print(5,20));

console.log("Multiplication of a number");

console.log('factorial of a number', factorial(3));


let company = {
    sales: [{
      name: 'John',
      salary: 1000
    }, {
      name: 'Alice',
      salary: 1600
    }],
  
    development: {
      sites: [{
        name: 'Peter',
        salary: 2000
      }, {
        name: 'Alex',
        salary: 1800
      }],
  
      internals: [{
        name: 'Jack',
        salary: 1300
      }]
    }
  };

  function sumSalaries(department) {
    if (Array.isArray(department)) { 
      return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
    } else { 
      let sum = 0;
      for (let subdep of Object.values(department)) {
        sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
      }
      return sum;
    }
  }
  
  console.log(sumSalaries(company));