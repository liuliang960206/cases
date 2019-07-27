let id = 0;
let res = false;
remove.onclick = function(){
    let ary = getChild(globalId);
    // 筛选出当前页面中 选中的元素，如果没有选中元素要提示
    let arr = ary.filter(item=>item.checked);
    if(arr.length<1){
        topTip('请选择要移动的文件');
        return;
    }
    moveTanbox.style.display = 'block';
    moveX.onclick = moveCancel.onclick= function(){
        moveTanbox.style.display = 'none';
    };
}



