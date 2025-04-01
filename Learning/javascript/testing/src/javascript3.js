const fact= function(n){
    return n<2?1:n*fact(n-1);
}
module.exports = fact;