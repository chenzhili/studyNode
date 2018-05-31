/*********所有的递归都可以用迭代来替换，在递归中最后值得返回必须等待所有递归函数执行完成才会返回；
********************************/
/**
 ****************实现栈
 */
function Stack(){
    this.data = [];
    this.top = 0;
}
Stack.prototype = {
    push(ele){
        this.data[this.top++] = ele;
        return this.data;
    },
    pop(){
        // 这里不是这种方式 删除 数组的 元素，只是取出这个值
        let tempEle = this.data.pop();
        this.top--;
        return tempEle;
        // 这中相当于是 指针的 移动，没有删除数据
        // return this.data[--this.top];
    },
    peek(){
        return this.data[this.top-1]
    },
    clear(){
        this.data.length = 0;
        return this.data;
    },
    length(){
        return this.top
    },
    isEmpty(){
        return this.top == 0
    }
}



// 课后习题
/*  
栈可以用来判断一个算术表达式中的括号是否匹配。 编写一个函数， 该函数接受一个算
术表达式作为参数， 返回括号缺失的位置。 下面是一个括号不匹配的算术表达式的例
子： 2.3 + 23 / 12 + (3.14159× 0.24
*/
// 现实现筛选
let itemIsTrue = (stack,ele)=>{
    switch(ele){
        case "(":
        case "{":
        case "[":
        stack.push(ele);
        break;
        case ")":
        case "}":
        case "]":
        let tempEle = stack.pop();
        break;
    }
}
let firstJudge = (express,stack)=>{
    let tempArr = express.split("");
    tempArr.forEach(v=>{
        itemIsTrue(stack,v);
    });
    if(stack.isEmpty()){
        console.log("括号匹配");
    }else{
        console.log("括号不匹配");
    }
}
let stack1 = new Stack();
firstJudge("2.3 + 23 / 12 + (3.14159× 0.24",stack1);

/* 
现实生活中栈的一个例子是佩兹糖果盒。 想象一下你有一盒佩兹糖果， 里面塞满了红
色、 黄色和白色的糖果， 但是你不喜欢黄色的糖果。 使用栈（有可能用到多个栈） 写一
段程序， 在不改变盒内其他糖果叠放顺序的基础上， 将黄色糖果移出
*/
let test = (stack)=>{
    let tempArr = [];
    while(!stack.isEmpty()){
        let tempEle = stack.pop();
        if(tempEle != 2){
            tempArr.push(tempEle);
        }
    }
    tempArr = tempArr.reverse();
    tempArr.forEach(v=>{
        stack.push(v);
    });
    console.log(stack);
}
let stack2 = new Stack();
stack2.push(1);
stack2.push(2);
stack2.push(3);
stack2.push(2);
stack2.push(1);
stack2.push(2);
console.log(test(stack2));