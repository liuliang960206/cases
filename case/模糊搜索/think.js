/* 
    1.点击li添加一个内容
    2.按着ctrl + 点击（批量添加内容）
    3.点击是已经选中的就删除
    4.按住键盘上下翻目录，翻到最后一个跑到第一个上去
    5.按住ctrl + 回车（批量添加内容）
    6.直接回车为选中的内容
*/
class search {
    constructor() {
        this.input = document.getElementById('input');
        this.ul = document.getElementById('list')
        this.lis = document.querySelectorAll('#list>li')
        this.mouseadd();
        this.keyboard();
        this.keyaddMore();
    }
    mouseadd() {
        // 鼠标点击li，输入框中添加一个内容; 按住ctrl，单击批量添加内容
        let that = this;
        this.input.onfocus = function (ev) {
            //获取到焦点时，显示ul下的关键字列表
            that.ul.style.display = 'block';
        }
        this.lis.forEach(item => {
            item.onclick = function (ev) {
                let inputVal = that.input.value;
                if(ev.ctrlKey){
                    console.log(item.innerText)
                    inputVal += item.innerText;
                    that.input.value = inputVal;
                }else{
                    that.input.value = item.innerText;
                }
            }
        });
    }
    keyaddMore(){
        // 按住ctrl + 回车（批量添加内容）
        this.lis.forEach(item => {
            item.onkeydown = function (ev) {
                let inputVal = that.input.value;
                if(ev.ctrlKey && ev.keyCode === 13){
                    console.log(item.innerText)
                    inputVal += item.innerText;
                    that.input.value = inputVal;
                }else{
                    that.input.value = item.innerText;
                }
            }
        });
    };
    keyboard() {
        //按键盘上翻页向上翻动列表
        let num = -1;
        input.onkeydown = ev => {
            switch (ev.keyCode) {
                case 38:
                    num--;
                    this.changeItem(num)
                    break;
                case 40:
                    num++;
                    this.changeItem(num)
                    break;
            }
            // if(ev.keyCode === 13){
            //     that.input.value = that.lis[num-1].innerText
            // }
        }
    };
    changeItem(num) {
        // 翻动列表上一项下一项
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
        }
        if (num === this.lis.length) {
            num = 0;
        } else if (num < 0) {
            num = this.lis.length - 1;
        }
        console.log(num)
        this.lis[num].className = 'hover';
    }
}
let s = new search(); 