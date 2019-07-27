class Table {
    constructor() {
        this.data = data;
        this.tbody = document.querySelector('#tab tbody');
        this.addBtn = document.querySelector('#add');
        this.name = document.querySelector('#name');
        this.age = document.querySelector('#age');
        this.s1 = document.querySelector('#s1');
        this.s2 = document.querySelector('#s2');
        this.s1Btn = document.querySelectorAll('#s1 option');
        this.s2Btn = document.querySelectorAll('#s2 option');
        this.checkedAllBtn = document.querySelector('#tab thead th:nth-of-type(1) input');
        this.rm = document.getElementById('rm');
        this.render(this.data);
        this.changeColor();
        this.add();
        this.sort();
        this.checkedAll();
        this.up();
        this.down();
        this.delete();
        this.delAll();
    }
    render(data) {
        // 渲染页面
        let html = '';
        data.forEach(item => {
            html += `<tr>
            <td><input type="checkbox"></td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="button" value="删除" class="remove">
                <input type="button" value="上移" class="up">
                <input type="button" value="下移" class="down">
            </td>
        </tr>`;
        });
        this.tbody.innerHTML = html;
        // console.log(this);
        // this.up();
    }
    changeColor() {
        // 隔行变色
        this.trs = this.tbody.querySelectorAll('tr');
        for (let i = 0; i < this.trs.length; i++) {
            this.trs[i].className = `bg${i % 2}`;
            this.trs[i].onmouseove = function () {
                this.className += ' hover';
            }
        }
    }
    add() {
        // 添加内容
        let that = this;
        this.addBtn.onclick = function () {

            that.data.push({
                'id': that.data.length + 1,
                'name': that.name.value,
                'price': that.age.value,
                'checked': false
            })
            that.render(that.data);
            that.changeColor();
            // that.up();
            // that.down();
        }
    }
    sort() {
        // 按年龄/编号排序 默认从低到高
        this.ary = ["id", "price"];
        this.s1Btn.forEach((item, i) => {
            // select下的option元素为什么不能添加onclick事件？？
            this.s1.onclick = (ev) => {
                // console.log(ev.target) ??
                this.data.sort((a, b) => {
                    a = a[this.ary[i]]
                    b = b[this.ary[i]]
                    // console.log(a, b)
                    return a - b
                })
                this.render(this.data);
                this.changeColor();
            };
        });

        this.s2Btn.forEach((item, i) => {
            // select下的option元素为什么不能添加onclick事件？？
            this.s2.onclick = (ev) => {
                // console.log(ev.target) 
                this.data.sort((a, b) => {
                    a = a[this.ary[i]]
                    b = b[this.ary[i]]
                    return b - a
                })
                this.render(this.data);
                this.changeColor();
            };
        });
    }
    checkedAll() {
        // 全选
        this.checkbox = this.tbody.querySelectorAll('tr td:nth-of-type(1) input');
        let onoff = true;
        this.checkedAllBtn.onclick = () => {
            if (onoff) {
                $('input').prop('checked', true);
            } else {
                $('input').prop('checked', false);
            }
            onoff = !onoff;
            // ???如果所有的input都为true,就让全选input加checked
            for (let i = 0; i < this.checkbox.length; i++) {
                if (this.checkbox[i].checked) {
                    this.checkedAllBtn.checked = true;
                }
            };
        }
    }
    up(){
        //上移 下移 删除 只能操作一次??
        this.up = document.querySelectorAll('.up');
        let that = this;
        for (let i = 0; i < this.up.length; i++) {
            // console.log(this.up[i])
            this.up[i].upIndex = i;
            this.up[i].onclick = function () {
                if (this.upIndex === that.up[0]) {
                    return;
                };
                let replace = that.data[i];
                that.data[i] = that.data[i - 1];
                that.data[i - 1] = replace;
                that.render(that.data);
                that.changeColor();
            };
        };
    }
    down(){
        // 下移
        this.down = document.querySelectorAll('.down');
        let that = this;
        for (let i = 0; i < this.down.length; i++) {
            this.down[i].downIndex = i;
            this.down[i].onclick = function () {
                if (this.downIndex === that.down.length - 1) {
                    return;
                };
                let replace = that.data[i];
                that.data[i] = that.data[i + 1];
                that.data[i + 1] = replace;
                that.render(that.data);
                that.changeColor();
            };
        };
    }
    delete(){
        // 删除
        let that = this;
        this.remove = document.querySelectorAll('.remove');
        // debugger;
        for(let i = 0;i<this.remove.length;i++){
            this.remove[i].onclick = function(){
                // console.log(i);
                that.data.splice(i,1); 
                that.render(that.data);
                that.changeColor();
            }
        }
    }
    delAll(){
        // 批量删除
        this.rm.onclick = ()=>{
            if(this.checkedAllBtn.checked){
                this.tbody.innerHTML = ''
                this.checkedAllBtn.checked = false;
            }
        };
    }
}
new Table();