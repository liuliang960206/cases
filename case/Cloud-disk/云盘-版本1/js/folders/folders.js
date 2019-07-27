class Folders {
    constructor(data, id) {
        this.data = data;
        console.log(data)
        this.folders = document.querySelector('.folders');
        this.render(id);
        this.breadNav();
        this.treeMenu();
        this.delete();
        this.move();
        this.drag();
    }
    getChild(pid) {
        if (!data[pid]) return null;
        let arr = [];
        for (let attr in this.data) {
            if (this.data[attr].pid === pid) {
                arr.push(this.data[attr]);
            };
        };
        return arr
    }
    render(id) {
        // 渲染页面（微云下的数据）
        let that = this;
        this.folders.innerHTML = '';
        //每次渲染之前先清空页面
        let ary = this.getChild(id);
        ary.forEach((item, i) => {
            this.div = document.createElement('div');
            this.div.className = 'file-item';
            this.img = document.createElement('img');
            this.img.src = 'img/folder-b.png';

            // 双击图片，进入子级菜单
            this.img.ondblclick = function () {
                that.render(item.id);
            }

            this.span = document.createElement('span');
            this.span.className = 'folder-name';
            this.span.innerHTML = item.title;
            this.input = document.createElement('input');
            this.input.className = 'editor';
            this.is = document.createElement('i');
            this.is.style.background = 'none';
            this.is.className = 'checked';

            //  点击选中，再次点击取消
            let onoff = true;
            this.is.onclick = function () {
                 // console.log(this.is)
                 if (onoff) {
                     this.style.background = 'url(../img/checked.png) no-repeat';
                 }else{
                     this.style.background = 'none';
                 }
                 onoff = !onoff;
            }


            this.folders.append(this.div);
            this.div.append(this.img, this.span, this.input, this.is);
        })
    }
    breadNav(){
        //面包屑
        let bread = document.querySelectorAll('.bread-nav')[0];
        for(let attr in this.data){
            if(data[attr].pid === attr*1){
                console.log(1)
            }
        };
        let html = '';
        html = `<a href="javascript">微云</a>`;
        bread.innerHTML = html;
    }
    treeMenu(){
        let menu = document.querySelectorAll('#section .tree-menu')[0];
        let html = '';
        for(let attr in this.data){
            console.log(data[attr].title)
            html = `<ul>
            <li>
                <div class="tree-title tree-ico open">
                    <span><i></i>微云</span>
                </div>
            `;
            html += `<ul>
            <li>
                <div class="tree-title tree-ico close">
                    <span><i></i>${data[attr].title}</span>
                </div>
            </li>
                </ul>
            </li>
            `;
            html += `</ul>`
            menu.innerHTML = html;
        };

    }
    delete(){
        let del = document.getElementById('del');
        let divs = this.folders.children;
        
        let tanbox = document.getElementById('tanbox');
        let ico = document.querySelectorAll('#tanbox .conf .close-ico')[0];
        let yes = document.querySelector('#tanbox .conf .conf-btn a:nth-of-type(1)');
        let no = document.querySelector('#tanbox .conf .conf-btn a:nth-of-type(2)');
        let that = this;
        del.onclick = function(){
            tanbox.style.display = 'block';
        }
        ico.onclick = function () {
            tanbox.style.display = 'none';
        }
        yes.onclick = function(){
            for(let i = 0;i<divs.length;i++){
                console.log(that.is.style.background === 'none')
            }
        }
        no.onclick = function(){
            tanbox.style.display = 'none';
        }
    }
    move(){
        let remove = document.getElementById('remove');
        let modalTree = document.getElementsByClassName('modal-tree')[0];
        let iconClose = document.querySelectorAll('.modal-tree i')[0];
        let no = document.querySelectorAll('.modal-tree .footer input')[0];
        let yes = document.querySelectorAll('.modal-tree .footer input')[1];
        remove.onclick = function(){
            modalTree.style.display = 'block';
        };
        iconClose.onclick = function(){
            modalTree.style.display = 'none';
        };
        no.onclick = function(){
            modalTree.style.display = 'none';
        }

    };
    drag(){
        let fBox = document.getElementById('fBox');
        // let body = document.getElementById('body');
        document.addEventListener('mousedown',function(ev){
            let box = document.createElement('div');
            box.id = 'box1';
            fBox.appendChild(box);
            let left = ev.pageX;
            let top = ev.pageY;
            box.style.cssText = `top:${top}px;
            left:${left}px;`
            let move = function(){
                box.style.width = Math.abs(ev.pageX - left )+ 'px';
                box.style.height = Math.abs(ev.pageY - top) + 'px';
                box.style.left = Math.min(left,ev.pageX) + 'px';
                box.style.top = Math.min(top,ev.pageY) + 'px';
            };
            let up = function(){
                box.remove();
                document.removeEventListener('mousemove',move);
                document.removeEventListener('mouseup',up);
            };
            document.addEventListener('mousemove',move);
            document.addEventListener('mouseup',move);
        });
    }
}
let f = new Folders(data, 0);
