class Recruit {
    constructor(data) {
        this.rightList = document.getElementById('rightList');
        this.leftLi = document.querySelectorAll('#leftList li');
        this.nav = document.getElementById('nav');
        this.data = data;

        this.dataName = 'sh';
        this.page = 1;
        this.hash = window.location.hash;
        this.render(data,this.dataName)

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
                    <p><span class="text">${data[dataName].text[i].info[0].l.join('')}</span><a href="content.html">查看详情>></a></p>
                </div>
            </li>`
            }
        }
        this.rightList.innerHTML = html;
    }
    
}
new Recruit(data);