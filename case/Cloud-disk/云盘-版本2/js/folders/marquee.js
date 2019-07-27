let { position, collision } = tools;
// let num = 0;
fBox.onmousedown = function (ev) {
    if(ev.target.classList.contains('file-item') || ev.target.parentNode.classList.contains('file-item')){
        return false;
    }
    /* 
        选框：
        ev.pageX: 鼠标到页面左边的距离
        fBox.offsetLeft: fBox到页面左边的距离
        disX: 鼠标到fBox左边的距离
        top: 获取元素到页面顶端的绝对位置
            或者 fBox.getBoundingClientRect().top
        disY: 鼠标到fBox顶部的距离

        移动时：move
        选框宽高 = 移动的距离
        选框left/top = 移动的距离与按下的距离取小
    */
    kuang.style.display = 'block';
    let disX = ev.pageX - fBox.offsetLeft;
    // let {top} = position(fBox);
    let top = fBox.getBoundingClientRect().top;
    let disY = ev.pageY - top;
    kuang.style.left = disX + 'px';
    kuang.style.top = disY + 'px';
  

    fBox.onmousemove = function (ev) {
        let width = Math.abs((ev.pageX - fBox.offsetLeft) - disX);
        let height = Math.abs((ev.pageY - top) - disY);
        kuang.style.width = width + 'px';
        kuang.style.height = height + 'px';

        kuang.style.left = Math.min(disX, (ev.pageX - fBox.offsetLeft)) + 'px';
        kuang.style.top = Math.min(disY, (ev.pageY - top)) + 'px';

        /* 
            选框碰撞：
            A. 获取所有的div文件夹元素
            B. 调用collision方法,选框与每一个div元素碰撞
        */
        const divs = document.querySelectorAll('.file-item');    
        data[0].checked = true
        divs.forEach((item,i)=>{
            if(collision(kuang,item)){
                data[item.dataset.id*1].checked = true;
            }else{
                data[item.dataset.id*1].checked = false;
            };
        });
        return false;
    }
    document.onmouseup = function () {
        kuang.style.display = 'none';
        kuang.style.width = kuang.style.height = 0;
        fBox.onmousemove = fBox.onmouseup = null;
    }
}




