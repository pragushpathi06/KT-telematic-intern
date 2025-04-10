// Class inheritance

class FourWheeler {
    constructor(brand, model,wheels=4){
        this.brand=brand;
        this.model=model;
        this.wheels=wheels;
    }
    engineStart(){
        console.log(`${this.brand} ${this.model} is started `) 
    }
    engineStop(){
        console.log(`${this.brand} ${this.model} is stopped `) 
    }
}

class Lorry extends FourWheeler{
    constructor(brand, model, wheels, color, registrationNo, yearOfManufacture){
        super(brand,model,wheels);
        this.color=color;
        this.registrationNo=registrationNo;
        this.yearOfManufacture=yearOfManufacture;
    }
    displayInfo() {
        console.log(`Brand: ${this.brand}`);
        console.log(`Model: ${this.model}`);
        console.log(`Color: ${this.color}`);
        console.log(`Registration No: ${this.registrationNo}`);
        console.log(`Year: ${this.yearOfManufacture}`);
        console.log(`Wheels: ${this.wheels}`);
    }
    engineStart() {
        console.log(`Lorry ${this.brand} ${this.model} is started`);
    }

    loadCargo(weight) {
        console.log(`----${weight}kg loaded into the lorry--`);
    }
    
    unloadCargo() {
        console.log(`---- Cargo unloaded from the lorry----`);
    }
    

}

// class 
const truck1 = new Lorry("Tata", "Ultra", 6, "Blue", "TN59AD0012", 2020);

truck1.engineStart();
truck1.displayInfo();
truck1.loadCargo(10000);
truck1.engineStop();
truck1.unloadCargo();

console.log('------------------');


