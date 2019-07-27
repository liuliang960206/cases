let {getParent,getParents} = tools;

// 渲染面包屑
function renderBreadNav(){
    let html = '';
    let ary = getParents(globalId);
    ary.forEach((item,i,all)=>{
        if(i !== all.length-1){
            html += `<a data-id = "${item.id}" href="javascript:;">${item.title}</a>`;
        }else{
            html += `<span>${item.title}</span>`;
        }
        
    });
    breadNav.innerHTML = html;
}
renderBreadNav();

/* 
    点击面包屑导航的时候，
    A.渲染页面（参数id为当前点击元素的id）
    B.渲染面包屑导航
*/ 
breadNav.onclick = function(ev){
    if(ev.target.tagName === 'A'){
        render(ev.target.dataset.id)
        console.log(ev.target.dataset)
        renderBreadNav();
    }
}