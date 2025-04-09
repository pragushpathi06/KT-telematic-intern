
// Getter and Setter 

const person = {
    firstName:'Pragush',
    lastName:'pathi',
    get fullname(){
         return `${this.firstName} ${this.lastName}`
    },
    set fullname(value){
        const str=value.split(" ");
        this.firstName=str[0];
        this.lastName=str[1];
    }
 }

 person.fullname='Suresh Kumar';
 console.log(person.fullname);
 
 const account={
    userName:'Pragushpathi',
    _balance:1000000,
    get balance(){
        console.log('welcome to IDBI bank');
        return  `${this.userName} your balance is ${this._balance}`
    },
    set balance(value){
        this._balance=value;
    }
 } 
 console.log(account.balance);
 
 account.balance=100;
 console.log(account.balance);

