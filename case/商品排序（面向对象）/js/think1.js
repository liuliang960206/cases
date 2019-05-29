class ordering {
    constructor(id) {
        this.ul = document.getElementById(id);
        this.btns = document.querySelectorAll('.header>a');
        this.getData();
    }
    getData(callback) {
        fetch('./json/product.json')
            .then(item => {
                //console.log(item);
                //Response对象下的json方法
                return item.json()
            })
            .then(data => {
                data.push(...data, ...data)
                this.data = data;
                //调用方法一定要在获取数据里面写，涉及到异步问题
                this.render();
                this.sort();
                this.scrollPic()
                window.onscroll = this.scrollPic.bind(this);
                // 当前this指事件前面的元素window，所以要用bind更改this指向
            })
    }
    render() {
        let html = '';
        this.data.forEach(item => {
            html += `<li>
            <img data-pic=${item.img} alt="">
            <span>${item.title}</span>
            <span>${item.time}</span>
            <span>价格：${item.price}</span>
            <span>热度：${item.hot}</span>
            </li>`
        });
        this.ul.innerHTML = html;
    };
    scrollPic() {
        this.lis = document.querySelectorAll('#list>li');
        this.imgs = document.querySelectorAll('#list>li>img');
        for (let i = 0; i < this.lis.length; i++) {
            //循环每一个li，如果li到页面顶部的距离小于可视区高度，就图片的src等于前面给图片地址设置的自定义属性值
            let windowHeinght = window.innerHeight;
            let liHeight = this.lis[i].getBoundingClientRect().top;
            if (liHeight <= windowHeinght) {
                if (!this.imgs[i].dataset.pic) {
                    continue;
                };
                this.imgs[i].src = this.imgs[i].dataset.pic;
                let timer = setTimeout(() => {
                    this.imgs[i].style.opacity = 1;
                    delete this.imgs[i].dataset.pic;
                }, 1000)
            };
        }
    }
    sort() {
        let ary = ["time", "hot", "price"]
        this.data = JSON.parse(JSON.stringify(this.data));
        this.btns.forEach((item, i) => {
            item.onoff = 1;
            item.onclick = () => {
                item.onoff *= -1;
                this.data.sort((a, b) => {
                    if (ary[i] === "time") {
                        a = a["time"].split('-').join('') * 1;
                        b = b["time"].split('-').join('') * 1;
                    } else {
                        console.log(a[ary[i]])
                        a = a[ary[i]];
                        b = b[ary[i]];
                    }
                    return (a - b) * item.onoff;
                })
                this.render()
            };
        });
    };
};
let o = new ordering('list');