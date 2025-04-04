function final(price, discount) {
    return price - (price * discount) / 100;
}

let product = {
    id: 101,
    name: "Bag",
    price: 500,
    discount: 10,
    finalPrice: function () {  
        return final(this.price, this.discount);
    }
};

console.log(product); 
