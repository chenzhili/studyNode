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
 */
let prime = (n)=>{
    for(let i=2;i<n;i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;
}
console.log(prime(99090901));