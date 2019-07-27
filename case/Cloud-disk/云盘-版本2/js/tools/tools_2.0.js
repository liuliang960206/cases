let tools = (function () {

    /* 
        getChild：获得与输入值相同的几项数据
        循环所有data数据的每一项,如果循环的每一项中的pid值和传进来的id值一样，就把这一项添加到空数组中
        如果整个对象下都没有传进来的数据，就返回null
    */
    function getChild(pid) {
        if (!data[pid]) return null;
        let ary = [];
        for (let attr in data) {
            if (data[attr].pid === pid) {
                ary.push(data[attr]);
            };
        };
        return ary
    };

    // 动画库
    var Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*(t/d) + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) { 
                return b; 
            }
            if ( (t /= d) == 1 ) {
                return b+c; 
            }
            if (!p) {
                p=d*0.3; 
            }
            if (!a || a < Math.abs(c)) {
                a = c; 
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        //弹性运动
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },    
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c; 
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
               s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }, 
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158; 
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },     
        //自由落体  
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },      
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    }

    // 运动
    function startMove(opts) {
        let opt = {
            obj: null,
            json: {},
            durtion: 1000,
            cb: function () { },
            fx: 'linear'
        }

        //有配置走配置，没配置走默认
        Object.assign(opt, opts);
        if (opts.cb && typeof opts.cb !== 'function') {
            opt.cb = function () { }
        }

        let f = opt.fx;
        //存储每个属性的初始值和目标点
        let j = {};
        // 枚举整个json,把每个属性赋值为对象，在对象下又有初始值和目标点
        for (let attr in opt.json) {
            if (opt.json.hasOwnProperty(attr)) {
                //获取到每个属性的初始值
                let b = parseFloat(getComputedStyle(opt.obj)[attr]);
                let c = 0;
                //获取到每个属性的目标点 类似于{width:{fx:'exx',d:500}}
                if (typeof opt.json[attr] === 'object') {
                    j[attr] = { b }
                    for (let attr2 in opt.json[attr]) {
                        j[attr][attr2] = opt.json[attr][attr2];
                    }

                    j[attr].c = j[attr].c - j[attr].b;
                } else {
                    c = opt.json[attr];
                    c = c - b;
                    j[attr] = {
                        b,
                        c
                    };
                }
            }
        }

        let d = opt.durtion;
        let t = 0;


        (function move() {
            opt.obj.timer = requestAnimationFrame(move);
            t += 16.7;
            if (t >= d) t = d;

            for (let attr in j) {
                //把默认值赋值给fx，不然都覆盖了
                opt.fx = f;
                opt.fx = j[attr].fx || opt.fx;
                //如果是opacity就不加单位
                if (attr === 'opacity') {
                    opt.obj.style[attr] = Tween[opt.fx](t, j[attr].b, j[attr].c, d);
                } else {
                    opt.obj.style[attr] = Tween[opt.fx](t, j[attr].b, j[attr].c, d) + 'px';
                }
            }

            if (t === d) {
                cancelAnimationFrame(opt.obj.timer);
                opt.cb();
            }
        })();
    }

    // 获取data父级元素
    function getParent(id){
        if(!data[id] || data[id].pid === -1)return null;
        return data[data[id].pid];
    }

    // 获取本身其祖先元素
    function getParents(id){
        let arr = [];
        let now = data[id];
        while(now){
            arr.unshift(now);
            now = getParent(now.id)
        }
        return arr;
    }
    
    /* 
        获取元素的绝对位置：
        1.top = 元素外边框距离定位父级的距离 + 元素边框
        2.元素成为定位父级，重复操作1
        3.减掉元素本身边框距离
    */
    function position(ele){
        let obj = ele,
        top = 0,left = 0;
        while(obj){
            top += obj.offsetTop + obj.clientTop;
            left += obj.offsetLeft + obj.clientLeft;
            obj = obj.offsetParent;
        }
        top -= ele.clientTop;
        left -= ele.clientLeft;
        return {top,left}
    }

    function collision(obj,obj2){
        let l1 = obj.offsetLeft;
        let t1 = obj.offsetTop;
        let r1 = l1 + obj.offsetWidth;
        let b1 = t1 + obj.offsetHeight;

        let l2 = obj2.offsetLeft;
        let t2 = obj2.offsetTop;
        let r2 = l2 + obj2.offsetWidth;
        let b2 = t2 + obj2.offsetHeight;

        //只要碰到就返回true，否则false
        if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
            return false;
        }else{
            return true;
        }
    }

    return {
        getChild,
        startMove,
        getParent,
        getParents,
        position,
        collision
    }
})();