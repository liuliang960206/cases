/* 
    商品下架：
    1.constructor() 获取元素
    2.render() 将数据渲染到页面
    3.timeChange() 倒计时
    4.shake() 抖一抖
    5.lowerShelf() 下架盖章
    6.shopList() 将下架的商品下落到列表
    7.totalPrice() 计算总价
*/

// let time = '2019/05/03 16:31:00';
// let time = new Date(Date.now() + 3000);
let data = [
    {
        time: '2019/05/03 18:00:00',
        img: 'img/1.jpg',
        title: 'iphone7s plus 炫酷手机',
        price: '8888'
    },
    {
        time: '2019/05/03 18:00:00',
        img: 'img/2.jpg',
        title: '27 英寸配置 Retina 5K显示屏',
        price: '15999'
    },
    {
        time: '2019/05/03 18:00:00',
        img: 'img/3.jpg',
        title: '魅族、锥子、小米 “集”群',
        price: '20000'
    },
    {
        time: '2019/05/03 18:00:00',
        img: 'img/4.jpg',
        title: 'iWatch 智能手表不智能',
        price: '5000'
    },
];
class shop {
    constructor(data) {
        this.render(data);
        this.data = data;
        this.lis = document.querySelectorAll('#ul>li');
        this.btns = document.getElementsByClassName('btn');
        this.times = document.getElementsByClassName('times');
        this.inputdate = document.getElementsByClassName('inputdate');
        this.bigC = document.getElementsByClassName('big-c');
        this.bgs = document.getElementsByClassName('bg');
        this.footer = document.getElementById('footer');
        this.list = document.querySelector('.list');
        this.li2 = document.querySelector('.list>.li2')
        console.log(this.li2)
        this.timer = []; 
        //timer=[]是为了把倒计时的多个定时器的编号放进一个数组
        this.listData = [];
        this.events();
    }
    render(data) {
        //将data数据渲染到页面
        let html = '';
        data.forEach(item => {
            html += `<li>
                <div class="bg"></div>
                <div>
                    <input class="inputdate" type="text" value="${item.time}">
                    <input type="button" value="确认" class="btn">
                </div>
                <p class="times">剩余
                    <span>0</span>
                    <span>0</span>
                    <strong>:</strong>
                    <span>0</span>
                    <span>0</span>
                    <strong>:</strong>
                    <span>0</span>
                    <span>0</span>
                </p>
                <img src="${item.img}">
                <h5>${item.title}</h5>
                <p>抢购价：
                    <strong class="price">¥${item.price}</strong>
                </p>

                <div class="big-c">
                    <div class="med-c">
                        <div class="half1">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>
                        <P>商品已下架</P>
                        <div class="half2">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>
                    </div>
                </div>
            </li>`
        });
        ul.innerHTML = html;
    }
    events() {
        //点击事件，点击确认按钮时，执行倒计时方法
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].onclick = () => {
                this.timeChange(i);
            }
            // this.btns[i].click(); //自动执行
        }
    }
    timeChange(index) {
        //倒计时
        clearInterval(this.timer[index]); 
        //防抖：防止用户多次点击，在每次点击前清除上次点击的timer，此处因为有四个timer，所以需要按照索引每一个timer
        this.timer[index] = setInterval(() => {
            this.nowTime = Date.parse(new Date()); //对象转换数字
            this.tarTime = Date.parse(new Date(this.inputdate[index].value));
            this.diffTime = (this.tarTime - this.nowTime) / 1000; //秒
            if (this.diffTime < 0) {
                clearInterval(this.timer);
                return;
            }
            this.hours = Math.floor(this.diffTime / 60 / 60).toString();
            this.diffTime %= (60 * 60);
            this.minutes = Math.floor(this.diffTime / 60).toString();
            this.seconds = Math.floor(this.diffTime % 60).toString();
            this.hours = this.hours.padStart(2, '0');
            this.minutes = this.minutes.padStart(2, '0');
            this.seconds = this.seconds.padStart(2, '0');
            this.times[index].innerHTML = `
            剩余
                <span>${this.hours[0]}</span>
                <span>${this.hours[1]}</span>
                <strong>:</strong>
                <span>${this.minutes[0]}</span>
                <span>${this.minutes[1]}</span>
                <strong>:</strong>
                <span>${this.seconds[0]}</span>
                <span>${this.seconds[1]}</span>
            `
            //此处字符串拼接为了后面的判断和方法执行
            let time = this.hours + ':' + this.minutes + ':' + this.seconds;
            time === '00:00:00' ? this.shake(index) : null;
        }, 1000)
    }
    shake(index) {
        //抖一抖
        let ary = [-10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0];
        let timer = null;
        let num = 0;
        timer = setInterval(() => {
            num++;
            //定时器每次执行都让当前的整个li部分的left值移动，移动的值是数组中每一项的距离
            this.lis[index].style.left = ary[num] + 'px';
            if (num === ary.length) {
                //当移动完毕(即计数的值等于数组长度)，清除定时器，同时执行lowerShelf()方法（下架商品下落列表）
                clearInterval(timer);
                this.lowerShelf(index);
            }
        }, 16.7)
    }
    lowerShelf(index) {
        //商品下架盖章
        //当shake方法执行完毕后，背景显示，下架圆章显示，下架圆章在0.5s内缩小一倍
        this.bgs[index].style.display = 'block';
        this.bigC[index].style.visibility = 'visible';
        this.bigC[index].style.transition = '0.5s';
        this.bigC[index].style.transform = 'scale(1)';
        this.shopList(index);
    }
    shopList(index) {
        //将下架的商品下落到列表
        let html = ` 
        <ul class="style2">
        <li class="li1">${this.data[index].title}</li>
        <li class="li2">￥${this.data[index].price}</li>
        <li class="li3"><img src="${this.data[index].img}"/></li>
        </ul>`;
        /* 
            element.insertAdjacentElement(position, element);
            把元素添加到指定元素的任何位置 ES8方法

            Element.insertAdjacentElement方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。

            beforebegin：当前元素之前
            afterbegin：当前元素内部的第一个子节点前面
            beforeend：当前元素内部的最后一个子节点后面
            afterend：当前元素之后
        */
        this.list.insertAdjacentHTML('afterend', html);

        // this.listData 下架商品 每下架一个产品，就在空数组里添加一个对象，对象内容包括索引，标题，价格等信息
        this.listData.push({
            index: index,
            title: this.data[index].title,
            price: this.data[index].price * 1
        });
        this.totalPrice(index); //商品下落到列表后，执行totalPrice()方法（计算总价）
    };
    totalPrice(index) {
        //计算总价
        // console.log(this.listData[index].price);
        let total = 0;
        this.listData.forEach(item => {
            total += item.price;
        });
        this.li2.innerHTML = '价钱（总价：' + total + '）';
    }
}
let s = new shop(data);
fn(0)
fn(1)

