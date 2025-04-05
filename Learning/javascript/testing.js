// function final(price, discount) {
//     return price - (price * discount) / 100;
// }

// let product = {
//     id: 101,
//     name: "Bag",
//     price: 500,
//     discount: 10,
//     finalPrice: function () {  
//         return final(this.price, this.discount);
//     }
// };

// console.log(product); 

// function final(price, discount) {
//     return price - (price * discount) / 100;
// }

// let product = {
//     id: 101,
//     name: "Bag",
//     price: 500,
//     discount: 10,
//     finalprice : 0,
//     cal(){
//         this.finalprice = this.price * this.discount /100;
//         return this;
//     }
//     // get finalPrice() {
//     //     return final(this.price, this.discount);
//     // }

// }.cal();


let product = {
    name:'pragushpathi',
    price: 500,
    discount: 10,
    get finalPrice() {
      return this.price - (this.price * this.discount) / 100;
    }
  };

// console.log({... product });


function final(price,discount){
    return price-(price * discount)/100
}

let prod = {
    product1: {
      id: 101,
      name: "Bag",
      price: 500,
      discount: 10,
      get finalPrice(){
        return  final(this.price,this.discount);
      }
    },
    product2: {
      id: 102,
      name: "Shoes",
      price: 1000,
      discount: 20,
      get finalPrice(){
        return  final(this.price,this.discount);
      }
    }
  };

  for (const key in prod) {
    console.log({... prod[key]}); 
  }

