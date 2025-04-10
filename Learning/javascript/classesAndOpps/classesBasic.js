class basic{
    constructor(id,name,userName,password){
        this.id=id;
        this.name=name;
        this.userName=userName;
        this.password=password;
    }
    get username(){
        return this.userName;
    }
    set username(val){
        console.log(`your user name change to ${val}`);
        this.userName=val;
    }
    profile(){
        console.log(`profile 
            id - ${this.id}
            name - ${this.name}
            username - ${this._userName}
            password - ${this.password}`)
    }

}
const user1= new basic(1,'pragushpathi','pragush','12345@54321');

console.log(user1.username);

console.log(typeof basic);

// Class Expression

let basic1 = class {
    constructor(id,name,userName,password){
        this.id=id;
        this.name=name;
        this.userName=userName;
        this.password=password;
    }
    get username(){
        return this.userName;
    }
    set username(val){
        console.log(`your user name change to ${val}`);
        this.userName=val;
    }
    profile(){
        console.log(`---- profile --- \n\tid - ${this.id}\n\tname - ${this.name}\n\tusername - ${this._userName}\n\tpassword - ${this.password}\n`)
    }

}
new basic1(1,'pragushpathi','pragush','12345@54321').profile();


class basic2{
    constructor(id,name,userName,password){
        this.id=id;
        this.name=name;
        this.userName=userName;
        this.password=password;
    }
    ['methodName'] (){
        console.log("Running class");
    }
    get username(){
        return this.userName;
    }
    set username(val){
        console.log(`your username has change to ${val}`);
        this.userName=val;
    }
    profile(){
        console.log(`---- profile --- \n\tid - ${this.id}\n\tname - ${this.name}\n\tusername - ${this.userName}\n\tpassword - ${this.password}\n`)
    }

}

const user2= new basic2(1,'pragushpathi','pragush','12345@54321');

console.log(user2.methodName());


