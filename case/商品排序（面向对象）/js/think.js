class ordering {
    constructor(id) {
        this.ul = document.getElementById(id);
        this.btns = document.querySelectorAll('.header>a');
        
        this.ary = ['time','hot','price'];
        // 数组里面的每一项相当于变量，变量的每一项要和json的每一项对应
        this.getData();
        window.onscroll = this.scrollPic.bind(this);
    }
    getData(callback) {
        fetch('./json/product.json')
            .then(item => {
                //console.log(item);
                //Response对象下的json方法
                return item.json()
            })
            .then(data => {
                data.push(...data,...data)
                this.data = data;
                //调用方法一定要在获取数据里面写，涉及到异步问题
                this.render();
                this.sort();
                this.scrollPic()
            })
    }
    render() {
        let html = '';
        this.data.forEach(item => {
            html += `<li>
            <img data-pic=${item.img} alt="">
            <span>${item.title}</span>
            <span>${item.time}</span>
            <span>${item.price}</span>
            <span>${item.hot}</span>
            </li>`
        });
        this.ul.innerHTML = html;
    }
    sort() {
        //将数据地址进行深克隆，因为有还原按钮，所以不要操作原数据
        this.data = JSON.parse(JSON.stringify(this.data));
        this.btns.forEach((item, i) => {
            item.onoff = 1;
            item.onclick = () => {
                /* 
                    当点击一次：onoff=-1，return (a - b)*-1 即return b - a 即降序
                    当点击第二次：onoff = -1 * -1 = 1，return (a - b)*1 即return a - b 即升序
                */
                item.onoff *= -1
                this.data.sort((a, b) => {
                    if(this.ary[i] === "time"){
                        a = a[this.ary[i]].split('-').join('');
                        b = b[this.ary[i]].split('-').join('');
                    }else{
                        a = a[this.ary[i]]; // 即a["time"];对应json数据里面的 "2017-03-15"
                        b = b[this.ary[i]];
                    }
                    return (a - b) * item.onoff;
                })
                this.render();
            }
        })
    }
    scrollPic(){
        this.lis = document.querySelectorAll('#list>li');
        // this.imgs = document.querySelectorAll('#list>li>img');
        this.imgs = document.querySelectorAll('#list>li>img');
        for(let i = 0;i<this.lis.length;i++){
            let windowHeight = window.innerHeight;
            let liHeight = this.lis[i].getBoundingClientRect().top;
            if(liHeight <= windowHeight){
                if(!this.imgs[i].dataset.pic){
                    continue;
                }
                this.imgs[i].src = this.imgs[i].dataset.pic;
                let timer = setTimeout(()=>{
                    this.imgs[i].style.opacity = 1;
                    delete this.imgs[i].dataset.pic
                },1000)
            }
        }
    }

};
let o = new ordering('list');
