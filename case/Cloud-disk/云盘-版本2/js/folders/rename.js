rename.onclick = function () {
    let ary = getChild(globalId);
    let arr = ary.filter(item => item.checked);
    if (arr.length > 1 || arr.length < 1) {
        topTip('请选择一个文件');
    } else {
        const iChecked = folders.querySelector('i[class="checked');
        const input = iChecked.previousElementSibling;
        const span = input.previousElementSibling;
        span.style.display = 'none';
        input.style.display = 'block';
        input.value = span.innerHTML
        input.select();

        input.onblur = function () {
            let val = this.value.trim();
            if(val === arr[0].title){
                // span.style.display = 'block';
                // input.style.display = 'none';
                return;
            };
            if(!val){
                topTip('请输入文件名');
                return;
            }
            let id = arr[0].id;
            let ary = getChild(globalId).filter(ele=>ele.id !== id);

            let res = ary.some(item => { return item.title === val });

            if (!res) {
                //没有重名
                data[id].title = val;
            } else {
                //重名
                let val2 = val;
                let num = 0;
                while (res) {
                    val2 = val2.replace(/\(\d+\)/, '') + `(${++num})`;
                    res = ary.some(item => item.title === val2);
                }
                data[id].title = val2;
            }
            render(globalId);
            topTip('重命名');
        }
    }

}

