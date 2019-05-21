class Menu {
    constructor(data) {
        this.data = data;
        this.oUl = document.getElementById('oUl');
        this.render(this.data);
        this.divs = document.querySelectorAll('#oUl>li>div');
        // console.log(this.divs);
        this.clickEvent();
    }
    render(arr) {
        let html = '';
        arr.forEach(item => {
            // 如果数组的每一项（即对象）有child属性，即类名变为add，没有child属性，即没有下一级菜单，即为空字符串
            let spanClass = item.child ? 'add' : '';
            html += `<li>
            <span class="${spanClass}"></span>
            <div>${item.title}</div>
            `
            
            if (item.child) {
                html += `<ul>${this.render(item.child)}</ul>`
            }

            html += `</li>`
        });
        return this.oUl.innerHTML = html;
    }
    clickEvent() {
        // 点击，显示下一级菜单
        this.oUl.addEventListener('click', function (ev) {
            //console.log(ev);
            if (ev.target.tagName === 'DIV') {
                //如果当前点击的是div元素，或者前面的加号
                let next = ev.target.nextElementSibling; // 存储当前点击元素的下一级兄弟元素，即ul(下一级菜单)
                let prev = ev.target.previousElementSibling; // 存储当前点击元素的上一级兄弟元素，即span(加号)
                // console.log(prev);
                if (next) { // 如果有下一级兄弟元素，就让 ul菜单显示 
                    //console.log(prev.className === 'add');
                    if (prev.className === 'add') {
                        // 如果span元素的类名是add（即加号），就让next显示，并且让加号变成减号（即类名变成line）
                        next.style.display = 'block';
                        prev.className = 'line';

                        /* 
                            通过当前点击的div元素找到div的父级li元素 parent
                            通过li元素找到li的父级ul元素 ul
                            找到ul元素下的所有li元素 lis
                        */ 
                        let parent = ev.target.parentNode;
                        let ul = ev.target.parentNode.parentNode;
                        let lis = ul.children;
                        console.log(lis);
                        for (let i = 0; i < lis.length; i++) {
                            if (lis[i] != parent) {
                                /* 
                                    如果当前循环到的li元素 不是 当前点击的li元素 
                                    先找到当前点击的里元素下的所有ul (即下一级菜单)
                                    循环所有的非当前点击li元素下的ul元素，收起ul元素，
                                    并让ul父级即li元素的第一个子级span元素的类名变为加号
                                */
                                let uls = lis[i].getElementsByTagName('ul');
                                console.log(uls)
                                for (let j = 0; j < uls.length; j++) {
                                    uls[j].style.display = 'none';
                                    uls[j].parentNode.children[0].className = 'add';
                                }
                            }
                        };

                    } else {
                        next.style.display = 'none';
                        prev.className = 'add';
                    }
                }
            } else if (ev.target.tagName === 'SPAN') {
                let next = ev.target.nextElementSibling.nextElementSibling;
                if (next) {
                    if (ev.target.className === 'add') {
                        // console.log(ev.target);
                        next.style.display = 'block';
                        ev.target.className = 'line';

                        let parent = ev.target.parentNode;
                        let ul = ev.target.parentNode.parentNode;
                        let lis = ul.children;
                        for (let i = 0; i < lis.length; i++) {
                            if (lis[i] != parent) {
                                let uls = lis[i].getElementsByTagName('ul');
                                console.log(uls)
                                for (let j = 0; j < uls.length; j++) {
                                    uls[j].style.display = 'none';
                                    uls[j].parentNode.children[0].className = 'add';
                                }
                            }
                        };
                    } else {
                        next.style.display = 'none';
                        ev.target.className = 'add';
                    }
                }
            };
        });
    };
};
let m = new Menu(data);

