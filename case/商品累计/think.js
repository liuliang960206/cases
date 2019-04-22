
const subtract = document.querySelectorAll('.list>li>i:nth-of-type(1)');
const add = document.querySelectorAll('.list>li>i:nth-of-type(2)');
const em = document.querySelectorAll('.list>li>em');
const price = document.querySelectorAll('.list>li>span>strong:nth-of-type(1)');
const subtotal = document.querySelectorAll('.list>li>span>strong:nth-of-type(2)');

//总量 总价 最高价
const total = document.querySelectorAll('.info>span:nth-of-type(1)>em');
const totalPrice = document.querySelectorAll('.info>span:nth-of-type(2)>em');
const highestPrice = document.querySelectorAll('.info>span:nth-of-type(3)>em');

//数量 小计
let ary = [];
for (let i = 0; i < add.length; i++) {
    let num = 0;
    let priceNum = parseFloat(price[i].innerHTML);
    ary.push(priceNum);
    add[i].onclick = function () {
        num++;
        em[i].innerHTML = num;
        subtotal[i].innerHTML = priceNum * num + '元';
        fn();
        fn1();
    };
    subtract[i].onclick = function () {
        if (num === 0) return;
        num--;
        em[i].innerHTML = num;
        subtotal[i].innerHTML = priceNum * num + '元';
        fn();
        fn1();
    };
};

// 最高单价
ary.sort(function(a,b){
    return a-b;
});
let high = ary.splice(ary.length-1,1)[0];
highestPrice[0].innerHTML = high;

// 总量
function fn() {
    let count = 0;
    for (let i = 0; i < em.length; i++) {
        count += parseFloat(em[i].innerHTML);
    };
    total[0].innerHTML = count;
};
//总价
function fn1() {
    let count = 0;
    for (let i = 0; i < em.length; i++) {
        count += parseFloat(subtotal[i].innerHTML);
    };
    totalPrice[0].innerHTML = count;
};





