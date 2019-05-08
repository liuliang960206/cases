class recruit {
    constructor(data) {
        this.rightList = document.getElementById('rightList');
        this.nav = document.getElementById('nav');
        let page = this.getHash();
        if (page === 0) {
            this.render(data, 1);
        } else {
            this.render(data, page);
        }
        this.hashChange()
        this.data = data;

        // this.num = 0;
    }
    render(data, page) {
        let html = '';
        let aHtml = '';
        // let num = 0;
        console.log(data.sh.text)
        for (let k = (page - 1) * 4; k < (page - 1) * 4 + 4; k++) {
            let item = data.sh.text[k]
            if (item === undefined) {
                break;
            }
            html += ` <li>
            <span class="num">${(k + 1).toString().padStart(2, '0')}</span>
            <div class="list">
                <a href=""><span class="job">职位需求：${item.zw}</span><span>需求人数：${item.rs}名</span><time>${data.formateDate(item.sj)}</time></a>
                <p><span class="text">岗位要求：布拉布拉布拉一大段话布拉布拉布拉一大段话布拉布拉布拉一大段话</span><a href="content.html">查看详情>></a></p>
            </div>
        </li>`
        }
        this.rightList.innerHTML = html;
        let pageLength = Math.ceil(data.sh.text.length / 4);
        for (let i = 0; i < pageLength; i++) {
            aHtml += `<a href="#${i + 1}"  class=${i + 1 === page ? "active" : ''}>${i + 1}</a>`;
        }
        nav.innerHTML = '<a href="javascript:;" id="prev">&lt;</a>' + aHtml + '<a href="javascript:;" id="next">&gt;</a>';
        this.pagingEvents()

    }
    getHash() {
        return location.hash.substring(1) * 1;
    }
    hashChange() {
        window.onhashchange = () => {
            let page = this.getHash();
            this.render(data, page)
        }
    }
    pagingEvents() {
        let prev = document.getElementById('prev');
        let next = document.getElementById('next');
        prev.onclick = () => {
            let hash = this.getHash();
            window.location.hash = `#${hash === 1 ? 1 : hash - 1}`
        }
    }
}
let r = new recruit(data);
