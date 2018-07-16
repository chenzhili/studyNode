/**
 ***********************队列
 */
function Queue(){
    this.data = [];
}
Queue.prototype = {
    enqueue(ele){
        this.data.push(ele);
    },
    dequeue(){
        return this.data.shift();
    },
    empty(){
        return this.data.length == 0;
    },
    toString(){
        return this.data.toString();
    },
    // 队首
    front(){
        return this.data[0];
    },
    // 队尾
    back(){
        return this.data[this.data.length-1];
    },
    length(){
        return this.data.length;
    },
    clear(){
        this.data.length = 0;
    }
}

// 使用队列进行两位数字的排序,原理是通过是个队列表示对应的0-9的数字，对于十位和个位进行排序；
let sortNumber = (numArr)=>{
    let storArr = new Array(10).fill(null);
    for(let i=0;i<storArr.length;i++){
        storArr[i] = new Queue();
    }
    let storArrAgain = storArr.concat();
    numArr.forEach(v=>{
        storArr[v%10].enqueue(v);
    })
    // console.log(storArr);
    numArr = sortQue(storArr);
    numArr.forEach(v=>{
        storArrAgain[Math.floor(v/10)].enqueue(v);
    });
    console.log(sortQue(storArrAgain));
}
function sortQue(storArr){
    let tempArr = [];
    storArr.forEach(v=>{
        while(!v.empty()){
            tempArr.push(v.dequeue());
        }
    })
    return tempArr;
}
// sortNumber([11,22,13,43,28,42]);

// 优先队列,意思就是不一定先 进站的就先出站，有一个 优先级的判断，优先级高的先 出站，就是对于 dequeue 进行重写，假设 data还是存储的数据
let dequeue = ()=>{
    let priority = this.data[0].code;
    let tempI = 0;
    for(let i=1;i<this.data.length;i++){
        if(this.data[i].code < priority){
            priority = this.data[i].code;
            tempI = i;
        }
    }
    this.data.splice(tempI,1);
}


/**
 * *****************链表
 */
function Node(ele,prev){
    this.ele = ele; //当前元素
    this.next = null; //下个node
    this.prev = prev || null;
}
function LinkList(){
    this.head = new Node("head");
}
LinkList.prototype = {
    find(item){
        let current = this.head;
        while(item != current.ele){
            current = current.next;
        }
        return current;
    },
    // 在当前元素后插入元素 
    /**
     * 
     * @param {*} ele 插入的元素
     * @param {*} item 在哪插入
     */
    insert(ele,item){
        let current = this.find(item);
        let newNode = new Node(ele);
        newNode.ele = ele;
        newNode.next = current.next;
        newNode.prev = current.ele;
        current.next = newNode;

    },
    // 删除一个节点
    remove(ele){
        let currentMove = this.find(ele);
        currentMove.next.prev = currentMove.prev;
        // 相对前一个节点
        let prevNode = this.find(currentMove.prev);
        prevNode.next = currentMove.next;
        // 相对后一个节点
        let nextNode = this.find(currentMove.next.ele);
        nextNode.prev = prevNode.ele;
    },
    display(){
        let currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.ele);
            currNode = currNode.next;
        }
    }
}
var cities = new LinkList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");
cities.display();
cities.remove("Russellville");
cities.display();