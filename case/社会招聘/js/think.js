class Recruit {
    constructor(data) {
        console.log(data)
        this.rightList = document.getElementById('rightList');
        this.leftLi = document.querySelectorAll('#leftList li');
        this.nav = document.getElementById('nav');
        this.data = data;
        this.dataName = 'sh';
        this.page = 1;
        this.hash = window.location.hash;
        this.hashEvent();
        this.render(this.data, this.dataName);
        this.eventSwitch();
        this.pageEvent();
        this.pageChange();
        this.hashChange();
    }
    render(data, dataName) {
        // dataName可获取到社会招聘/校园招聘对应的数据
        /* 
            第1页：0~3
            第2页：4~7
            第3页：8~11
            第4页：12~15
            规律：(页数-1)*4 ~ (页数*4-1)
        */
        let html = '';
        for (let i = (this.page - 1) * 4; i < this.page * 4; i++) {
            if (data[dataName].text[i]) {
                // 判断的原因: 如果每页有数据
                html += `<li>
                <span class="num">${data.add0(i + 1)}</span>
                <div class="list">
                    <a href=""><span class="job">职位需求：${data[dataName].text[i].zw}</span><span>需求人数：${data[dataName].text[i].rs}名</span><time>${data.formateDate(data[dataName].text[i].sj)}</time></a>
                    <p><span class="text">${data[dataName].text[i].info[0].l.join('')}</span>
                    <a href="content.html?hash=${dataName}&id=${i}$page=${this.page}">查看详情>></a></p>
                </div>
            </li>`
            }
        }
        this.rightList.innerHTML = html;
    }
    eventSwitch() {
        // 点击校园招聘/社会招聘，切换内容，同时改变样式
        // 最后渲染页数
        let that = this;
        //console.log(this)
        let leftLiOne = this.leftLi[0];
        for (let i = 0; i < this.leftLi.length; i++) {
            this.leftLi[i].onclick = function () {
                leftLiOne.className = ''
                this.className = 'active';
                leftLiOne = this;
                that.dataName = data.list[i].lx;
                that.page = 1;
                that.render(data, that.dataName);
                that.pageChange();
                that.hashChange()
            }
        }
        // this.hashChange()
    }
    pageChange() {
        // 渲染页数
        this.pageNum = Math.ceil(data[this.dataName].text.length / 4);
        console.log(this.pageNum)
        let html = '';
        html = '<a href="javascript:;">&lt;</a>';
        for (let i = 0; i < this.pageNum; i++) {
            html += `<a href="javascript:;" class="${i === (this.page - 1) ? 'active' : ''}">${i + 1}</a>`
        }
        html += '<a href="javascript:;">&gt;</a>';
        this.nav.innerHTML = html
    }
    pageEvent() {
        //点击页数显示对应的页面，点击左右箭头显示上一页下一页
        let that = this;
        this.nav.onclick = function (ev) {
            if (ev.target.tagName === 'A') {
                if (ev.target.innerHTML === '&lt;') {
                    that.page--;
                } else if (ev.target.innerHTML === '&gt;') {
                    that.page++;
                }
                else {
                    that.page = ev.target.innerHTML * 1;
                }
            }
            if (that.page < 1) that.page = 1;
            if (that.page > that.pageNum - 1) that.page = that.pageNum;
            that.render(data, that.dataName);
            that.hashChange()
        }
    }
    hashChange() {
        this.hash = `#hash=${this.dataName}&page=${this.page}`;
        let reg = /#hash=([a-z]{2})&page=(\d+)/;
        this.hash.replace(reg, ($0, $1, $2) => {
            console.log($0, $1, $2)
            this.dataName = $1;
            if ($2 > this.pageNum) {
                this.page = this.pageNum;
            }
            this.page = $2;
            window.location.hash = `#hash=${this.dataName}&page=${this.page}`;
            console.log(window.location.hash)
        })


    }
    hashEvent() {
        window.onhashchange = () => {
            let reg = /#hash=([a-z]{2})&page=(\d+)/;
            window.location.hash.replace(reg, ($0, $1, $2) => {
                this.dataName = $1;
                if ($2 > this.pageNum) {
                    this.page = this.pageNum;
                }
                this.page = $2;
            })
            this.leftLi.forEach((item, i, all) => {
                item.className = '';
                if (this.dataName === 'sh') all[0].className = 'active';
                if (this.dataName === 'xy') all[1].className = 'active';
            })
            this.render(this.data, this.dataName);
            this.pageChange();
        }
    }
}
new Recruit(data);