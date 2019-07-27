function renderTree(num) {
    // 渲染页面
    let html = `<ul>
    <li data-id = "${data[num].id}">
        <div class="tree-title tree-ico open">
            <span><i></i>微云</span>
        </div>
    </li>`;
    let ary = getChild(num);
    if (ary.length) {
        html += `  <ul>
            ${
            ary.map(item => {
                let divClass = getChild(item.id).length ? 'tree-title tree-ico close' : 'tree-title tree-ico-none';
                return (
                    `<li  data-id = "${item.id}">
                            <div class="${divClass}">
                                <span>
                                <i></i>
                               ${item.title}
                                </span>
                            </div>
                        </li>`
                )
            }).join('')
            }
        </ul>`;
    }
    treeMenu.innerHTML = html;
}
renderTree(0);

// 利用事件委托 如果点击的是菜单,并且有子级就展开子菜单，并且改变前面图标
treeMenu.onclick = function (ev) {
    if (ev.target.tagName === 'SPAN') {
        let li = ev.target.parentNode.parentNode; // li即每一个菜单 li元素
        let id = li.dataset.id * 1; // 每次点击的li元素的自定义属性即id
        let liClassList = li.children[0].classList;
        if (id) {
            renderBreadNav();
            render(id);
            /* 
                每个菜单即div元素的类名：
                tree-title：基础样式
                tree-ico/tree-ico-none：有前面的图标，即有子菜单 / 没有前面的图标，即没有子菜单
                open/close：前面的图标 是开启状态，即显示子菜单 / 前面的图标是关闭状态，即隐藏子菜单
            */

            if (liClassList.contains('tree-ico')) {
                // 如果有子菜单，就展开子级菜单
                /* 
                    如果div元素有close这个类名
                        就删除close类名，添加open类名
                        返回res: true
                    如果没有close类名
                        就添加close类名，删除open类名
                        返回res: false
                */
                let res = !liClassList.toggle('close');
                // if (liClassList.contains('close')) {
                if (res) {
                    liClassList.add('open');
                    liClassList.remove('close');
                } else {
                    liClassList.add('close');
                    liClassList.remove('open');
                }

                // 如果li的最后一个子元素不是ul，即没有显示子菜单，就展开子菜单；否则缩起子菜单
                if (li.lastElementChild.tagName !== 'UL') {
                    // 获取点击元素的所有子菜单的数据 
                    let ary = getChild(id);
                    let html = '<ul style="padding-left:70px">';
                    if (ary.length && res) {
                        html += `${
                            ary.map(item => {
                                // 如果点击的元素有子菜单
                                let sclass = getChild((item.id).length ? 'tree-title tree-ico close' : 'tree-title tree-ico-none');
                                return (
                                    // 返回ul内的内容：包括 li > div > span
                                    `<li data-id="${item.id}">
                                    <div class="${sclass}">
                                        <span><i></i>${item.title}</span>
                                    </div>
                                </li>`
                                )
                            }).join('')
                            }</ul>`;
                    };
                    html += `</ul>`
                    li.innerHTML += html;
                } else {
                    let uls = li.querySelectorAll('ul');
                    /* 
                        如果div元素有close这个类名,即res为true，
                            就变成换成open类名，并且显示li的子菜单ul
                        如果div元素有open这个类名,即res为false
                            收起当前的ul
                    */
                    if(res){
                        li.lastElementChild.style.display = 'block';
                    }else{
                        for (let i = 0; i < uls.length; i++) {
                            uls[i].style.display = 'none';
                        }
                    }
                }
            }
        }
    }
}







