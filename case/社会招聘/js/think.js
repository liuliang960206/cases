class Recruit {
    constructor(data) {
        this.rightList = document.getElementById('rightList');
        this.data = data;
    }
    renden(data) {
        //渲染页面
        let html = '';
        for (let i = 0; i < rightList.length; i++) {
            html += ` <li>
            <span class="num">${(k + 1).toString().padStart(2, '0')}</span>
            <div class="list">
                <a href=""><span class="job">职位需求：${item.zw}</span><span>需求人数：${item.rs}名</span><time>${data.formateDate(item.sj)}</time></a>
                <p><span class="text">岗位要求：布拉布拉布拉一大段话布拉布拉布拉一大段话布拉布拉布拉一大段话</span><a href="content.html">查看详情>></a></p>
            </div>
        </li>`
        }
    }
}
let r = new Recruit(data);