del.onclick = function () {
    let ary = getChild(globalId);
    tanbox.style.display = 'block';
    deleX.onclick = deleCancel.onclick = function () {
        tanbox.style.display = 'none';
    }
    // 当点击确认按钮时，找到当前数组中有选中的那个文件，删除对应id的那一项
    deleYes.onclick = function () {
        ary.forEach(item => {
            if(!item.checked){
                topTip('请选择删除文件');
            }
            if(item.checked){
                // console.log(item)
                // console.log(data[item.id])
                // delete item; //??? 
                delete data[item.id];
            }
            tanbox.style.display = 'none';
        });
        render(globalId);
    }
}