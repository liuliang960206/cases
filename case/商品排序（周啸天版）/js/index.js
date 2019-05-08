let listBox = document.getElementById('list');
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let productList = listBox.getElementsByTagName('li');

~function () {
    let productData = null;
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'json/product.json', false); 
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            productData = xhr.responseText;
        };
    };
    xhr.send(null); 
    console.log(typeof productData); 
    productData = JSON.parse(productData);
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img = 'img/1.jpg', 
            price,
            time,
            hot
        } = productData[i];
        str += `<li data-price="${price}" 
                    data-time="${time}" 
                    data-hot="${hot}">
        <a href="javascript:;">
        <img src="${img}" alt="">
        <p>${title}</p>
        <span>${price}</span><br/>
        <span>时间：${time}</span><br/>
        <span>热度：${hot}</span>
        </a>
        </li>`
    };
    list.innerHTML = str;
}()

~function () {
    let sortList = function () {
        let productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            let ary = ['data-time', 'data-price', 'data-hot'];
            let aInn = a.getAttribute(ary[this.index]),
                bInn = b.getAttribute(ary[this.index]);
            if (this.index === 0) {
                aInn = aInn.replace(/-/g, '');
                bInn = bInn.replace(/-/g, '');
            };
            let aP = a.getAttribute('data-price');
            let bP = b.getAttribute('data-price');
            return (aInn - bInn) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi); 
        };
    };
    for (let i = 0; i < linkList.length; i++) {
        let curLink = linkList[i];
        curLink.index = i; 
        curLink.flag = -1;
        curLink.onclick = function () {
            for (let i = 0; i < linkList.length; i++) {
                let item = linkList[i];
                if (item !== this) {
                    item.flag = -1;
                };
            };
            this.flag *= -1;
            sortList.call(this);
        };
    };
}();






/* 
    READ ME：

    0.获取当前页面中需要操作的元素
        A：需要获取的元素：list/header/header中所有的a/list中所有的li
        B：注意DOM映射，不能使用querySelectorAll
    1.获取数据进行数据绑定
        A：发送ajax请求
            -> 创建一个变量用来存储的值
            -> 创建ajax的一个实例
            -> 打开一个请求链接
        B：把获取的json字符串传为对象
        C：基于ES6模板字符串把需要动态展示的内容进行拼接，最后存储倒容器中
            -> 循环获取的数据
            -> 把每一项获取到，解构赋值
            -> 字符串拼接
            -> 给li设置三个自定义属性存储价格/日期/热度
    2.点击操作
        A：循环给所有的a绑定点击事件
            -> 给每一个设置index/flag自定义属性，存储索引和-1
            -> 绑定 点击事件
                在点击事件中：
                    1.除了当前这个li，其余都让其flag -- 1
                    2.让当前li的flag乘等于-1
                    3.执行sortList，把thsi改为当前点击的a
        B：编写一个sortList方法（需要改变this不能同箭头函数)
            -> 把类数组转换为数组
            -> 把数组进行排序
                先根据点击a的索引获取到需要排序的项
                获取对应项中的内容（从自定义属性获取）
                日期需要把“-”去掉再进行减法运算
                通过相减，获取一个>0或者<=0的值，让获取的值乘以flag
            -> 把排好序的数组中的每一项依次加入到容器的末尾（其实是把原有li移动位置，这是DOM映射）

*/
