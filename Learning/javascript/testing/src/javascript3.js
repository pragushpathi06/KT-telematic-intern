const fact= function(n){
    if (n<0) return ;
    return n<2?1:n*fact(n-1);
}
module.exports = fact;