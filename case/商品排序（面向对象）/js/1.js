 /*
           1.先延迟加载
                拿到数据，结构的渲染
                延迟加载的判断
                    1.getBoundingClientRect().top  当前元素到可视区顶部的距离
           2.商品排序
        */

       class YCJZ {
        constructor(id) {
            // this.data = [];
            this.ul = document.getElementById(id);
            this.lis = null;
            this.btns = document.querySelectorAll('.header a');
            this.ary = ['time', 'hot', 'price'];
        }

        render(data) {
            let html = '';
            data.forEach(e => {
                html += `
                    <li>
                    <img data-pic="${e.img}" >
                    <span>${e.title}</span>
                    <span>${e.time}</span>
                    <span>${e.hot}</span>
                    <span>${e.price}</span>
                </li>
            `;
            });
            this.ul.innerHTML = html;
            this.lis = this.ul.children;
        }

        sort(data, cb) {
            data = JSON.parse(JSON.stringify(data));
            this.btns.forEach((ele, i) => {
                ele.onoff = true;
                let that = this;
                ele.onclick = function () {
                    if (this.onoff) {
                        data.sort((a, b) => {
                            if (that.ary[i] === 'time') {
                                // Date.parse("2016-01-30")
                                a = a[that.ary[i]].split('-').join('');
                                b = b[that.ary[i]].split('-').join('');
                            } else {
                                a = a[that.ary[i]];
                                b = b[that.ary[i]];
                            }
                            return a - b;
                        });
                    } else {
                        data.sort((a, b) => {
                            if (that.ary[i] === 'time') {
                                a = a[that.ary[i]].split('-').join('');
                                b = b[that.ary[i]].split('-').join('');
                            } else {
                                a = a[that.ary[i]];
                                b = b[that.ary[i]];
                            }
                            return b - a;
                        });
                    }

                    this.onoff = !this.onoff;
                    that.render(data);
                    //当重新渲染之后，然后执行一个函数。
                    cb && cb();
                }
            });
        }

        scrollPic() {
            /* 
                图片懒加载：
                如果元素到顶部的距离 <= 浏览器的高度（即浏览器底部到浏览器顶部的距离），就让图片显示（即让自定义属性变成src）；否则不显示
                如果元素到顶部的距离：getBoundingClientRect()
                浏览器的高度：window.innerHeight
            */
            // console.log(this.lis);

            for (let i = 0; i < this.lis.length; i++) {
                // iTop：元素到窗口顶部的距离 
                let iTop = this.lis[i].getBoundingClientRect().top;
                if (iTop <= this.iH) {
                    let img = this.lis[i].children[0];
                    // 找到每个li元素的第一项（即img元素）
                    if (!img.src) {
                        //如果没有img.src，就把自定义属性pic的值（即图片地址）赋值给src
                        img.src = img.dataset.pic;
                        setTimeout(() => {
                            //此处定时器的作用：隔100ms再显示图片
                            img.style.opacity = 1;
                            // img.removeAttribute('pic');
                            delete img.dataset.pic;
                        }, 100);
                    }
                }
            }
        }

        getData(cb) { // 获取json数据
            fetch('./json/product.json')
                .then(e =>e.json())
                .then(data => {
                    data.push(...data, ...data);
                    this.render(data);
                    // this.lis = this.ul.children;
                    this.iH = window.innerHeight;
                    //当所有数据都请求回来，如果有回调函数就调用回调函数
                    cb && cb(data); //钩子函数，回调函数
                    window.onscroll = this.scrollPic.bind(this);
                });
        }
    }

    let yc = new YCJZ('list');
    yc.getData(function (data) {
        //当数据获取出来之后调用延迟加载
        yc.scrollPic();
        yc.sort(data, function () {
            //当排好序，渲染完成之后，在调用延迟加载
            yc.scrollPic();
        });
    });
