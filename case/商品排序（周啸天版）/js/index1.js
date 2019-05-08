let listBox = document.getElementById('list');
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let productList = listBox.getElementsByTagName('li');

~function () {
    /* 
    获取数据和实现数据绑定：
    => 真实项目中，页面中的大部分数据都不是写死的，而是动态绑定的
    1.从服务器端获取到数据，基于ajax/JSONP等技术，通过服务器端提供的数据API接口地址，把数据请求回来
    2.把获取的数据进行解析（数据格式化）
    3.数据绑定，把我们获取的数据绑定到页面中的HTML结构上：ES6模板字符串 => `bg${i%2}`
*/

    let productData = null;

    // $$$$ 1.基于ajax获取数据
    let xhr = new XMLHttpRequest(); //创建ajax实例对象
    xhr.open('GET', 'json/product.json', false); //（调用xhr的open方法）
    /* 
      open方法的参数：
      1.http method 请求方式
      2.打开请求地址（一般是服务器端提供好的，会给我们一个API接口文档）
      3.设置同步还是异步：true => 异步  false => 同步；项目中常用的是异步（真是项目中最常使用异步，现在为了简单使用同步）
    */

    xhr.onreadystatechange = () => {
        // 监听xhr的onreadystatechange 事件 
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 如果满足这个条件，就表示当前请求已经顺利完成
            productData = xhr.responseText;
        };
    };
    xhr.send(null); // 发送ajax请求

    // 获取的结果是一个字符串：“JSON格式的字符串”，我们需要把获取的字符串转换为对象
    console.log(typeof productData); //=>string


    /*
        JSON格式：JSON是一种数据格式，不是一种数据类型，只要把对象的属性名用双引号括起来，此时的对象就不再称之为普通对象，而是叫JSON格式的对象
        例：
        1）let obj = {"name": "xxx"}; // obj为JSON格式的对象，属性名和属性值都是用双引号包着，操作起来和普通对象没有区别
        2）let str = '{"name":"xxx"}'; // JSON格式的字符串
    
        我们从务器端获取的数据大多数情况下都是JSON格式，大部分是JSON格式的字符串。（其他格式例如XML，HTML）。window对象上有一个json对象，json对象下有两个方法：
        1).JSON.parse() 把JSON格式的字符串传化为对象
        2).JSON.stringify() 把对象转化为JSON格式的字符串
    
    */


    // $$$$ 2.解析从服务器端获取的数据
    productData = JSON.parse(productData);
    // console.log(productData);

    // $$$$ 3.数据绑定（DOM数据绑定）：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面指定容器中
    /* 
        数据绑定方法：
        1.字符串拼接
        => 传统字符串拼接
        => ES6模板字符串拼接
        => 模板引擎：原理也是字符串拼接
        2.动态创建DOM
        => createElement
        => appendChild
        => 弊端：操作麻烦，消耗性能（DOM回流）
    */

    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img = 'img/1.jpg', //没有返回img，我们用默认图占位
            price,
            time,
            hot
        } = productData[i];
        //自定义属性名最好叫做“data-xxx”
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
        //this:点击的a标签
        /* 
            按照价格升序排列
            1.基于getElementsByTagName获取的元素集合是一个类数组不能直接使用数组中的sort方法(首先把类数组转化为数组，然后排序)
            2.基于sort方法给所有的li按照价格排序
            productAry: 数组 [li, li, li, li, li, li, li, li, li, li]
        */
        let productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            let ary = ['data-time', 'data-price', 'data-hot'];
            //=> 获取当前点A的索引，按照不同的方式进行排序
            let aInn = a.getAttribute(ary[this.index]),
                bInn = b.getAttribute(ary[this.index]);
            if (this.index === 0) {
                aInn = aInn.replace(/-/g, '');
                bInn = bInn.replace(/-/g, '');
            }
            // a是当前li元素，b是下一项li元素，应该获取每个li的价格，让价格相减，从而实现排序(首先数据绑定的时候，我们可以把后面需要用到的价格/日期/销量等信息，存储到li的自定义属性上[在结构中显示 后期只能基于getAttribute这种模式获取到]，后期需要用到这个值，我们基于自定义属性获取到即可)
            let aP = a.getAttribute('data-price');
            let bP = b.getAttribute('data-price');
            return (aInn - bInn) * this.flag;
        });
        //按照排好序的数组，我们把li重新增加到页面中
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi); //=> 向容器末尾追加新元素，但是页面不是20个，还是原有的10个，只不过顺序改变了
        }
    };
    //给每一个link都绑定点击切换
    for (let i = 0; i < linkList.length; i++) {
        let curLink = linkList[i];
        curLink.index = i; //设置自定义属性存储a的索引
        curLink.flag = -1; //每一个a标签都有一个flag，能够在点击时候实现-1 -- 1 之间的切换，点击都要执行sortList，同时方法中的this也都改为当前点击的a
        curLink.onclick = function () {
            //当前点击a便签我们需要让其余的a标签的flag原始值-1，这样下一次点击某一个a标签，还是从-1开始乘，变为1，也就是从升序开始的
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





