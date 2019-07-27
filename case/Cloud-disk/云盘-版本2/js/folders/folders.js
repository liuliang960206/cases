console.log(data);
function render(id) {
    folders.innerHTML = ''
    globalId = id * 1; //把传进来的id存起来
    let { getChild } = tools;
    let ary = getChild(globalId);
    // 如果有子级菜单（没有为null=>false）就渲染页面
    if (ary) {
        ary.forEach((item, i) => {
            // 初始化数据（pid=0的三项)
            const div = document.createElement('div');
            div.className = 'file-item';
            div.dataset.id = item.id;//把当前数组循环的每一项的id存成自定义属性，后面方便调用id
            const img = document.createElement('img');
            img.src = 'img/folder-b.png';
            const span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = item.title;
            const input = document.createElement('input');
            input.className = 'editor';
            const is = document.createElement('i');
            // is.className = 'checked';
            is.className = item.checked?'checked':'';
            // 判断，每一个小框是否打钩 ???
            folders.append(div);
            div.append(img, span, input, is);

            /* 
                双击图片进入下一级菜单（即pid=2）
                把每一项的id传递进getChild，返回的数组即是下一级菜单的数据（数组）
                1. 如果数组里的数据length不为0（true），即再次渲染
                2. 如果数组里的数据length为0（false），即没有数据
                    A. 显示无内容图片,
                    B. 清空页面上的原有数据
            */
            img.ondblclick = function () {
                //每次点进去新的页面，要把全选取消,并且把上一层的所有文件取消选中（即checked=false）
                checkedAll.className = ''
                ary.forEach(item=>{
                    item.checked=false
                });

                let ary2 = getChild(item.id);
                if (ary2.length) {
                    render(item.id);
                } else {
                    folders.innerHTML = ''
                    fEmpty.style.display = 'block';
                }
                globalId = item.id;
                //此处的item.id获取的是每一项的id，赋值给全局变量globleId
                renderBreadNav();
                //每次双击图片进入下一级菜单之后，再渲染面包屑导航
            };

            is.onclick = function(){
                data[item.id].checked = is.classList.toggle('checked');
                render(globalId);
            }
        })
    }
}
render(0);


