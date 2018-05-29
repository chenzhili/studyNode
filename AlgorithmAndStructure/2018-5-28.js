/**
 * 斐波那契数
 * @param {*} n 代表第几位
 */
// 这种实现，出现了无限迭代递归的情况，按着指数倍的 函数调用，很容易出现死循环；
/* let	fibonacci = (n)=>{
    if(n==1 || n==2){
        return 1
    }else{
        return fibonacci(n-2)+fibonacci(n-1)
    }
    
} */
let fibonacci = (n)=>{
    let result;
    if(n == 1 || n==2){
        result = 1;
    }
    let iterator = n - 2;
    let prev = 1;
    let prevPrev = 1;
    while(iterator){
        result = prev + prevPrev;
        prevPrev = prev;
        prev = result;
        iterator -= 1;
    }
    return result;
}
// console.log(fibonacci(1000));

/**
 * 质数
 * @param {*} n 
 * 这里需要优化，减少 循环查询
 */
let prime = (n)=>{
    if(n==1 || n == 2 || n==3){return true;}
    if(n%2 == 0){return false;}
    for(let i=2;i<n;i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;
}
// console.log(prime(99090901));

/**
 * 欧几里得算法
 * @param {*} a 整数
 * @param {*} b 整数
 */
let GCD = (a,b)=>{
    let min = Math.min(a,b);
    let max = Math.max(a,b);

    let mod = -1;
    let result = -1;
    while(mod != 0){
        mod = max%min;
        max = Math.max(mod,min);
        min = Math.min(mod,min);
    }
    return max;
}
// console.log(GCD(252000,1050000));

/**这是阮一峰的写法
 * @param {number} originalA
 * @param {number} originalB
 * @return {number|null}
 */
let euclideanAlgorithm = function (originalA, originalB) {
    const a = Math.abs(originalA);
    const b = Math.abs(originalB);
  
    if (a === 0 && b === 0) {
      return null;
    }
  
    if (a === 0 && b !== 0) {
      return b;
    }
  
    if (a !== 0 && b === 0) {
      return a;
    }
  
    // Normally we need to do subtraction (a - b) but to prevent
    // recursion occurs to often we may shorten subtraction to (a % b).
    // Since (a % b) is normally means that we've subtracted b from a
    // many times until the difference became less then a.
  
    if (a > b) {
      return euclideanAlgorithm(a % b, b);
    }
  
    return euclideanAlgorithm(b % a, a);
  }
//   console.log(euclideanAlgorithm(252000,1050000));

/**
 * least common multiple(最小公倍数)
 * 两个自然数的乘积等于这两个自然数的最大公约数和最小公倍数的乘积
 * @param {*} a 
 * @param {*} b 
 */
let lcm = (a,b)=>{
    return a*b/(GCD(a,b))
}
console.log(lcm(10,12));