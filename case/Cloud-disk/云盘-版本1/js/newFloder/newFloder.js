// class Create extends Folders{
//     constructor(){
//         super();
//         this.create = document.getElementById('create');
//         console.log(this.create)
//         this.render1();
//     };
//     render1(){
//         this.create.onclick = function(){

//         }
//     };
// };
// new Create();

class Create{
    constructor(data){
        this.create = document.getElementById('create');
        this.folders = document.querySelector('.folders');
        this.render();
    };
    render(){
        let that = this;
        this.create.onmousedown = function(){
            that.div = document.createElement('div');
            that.div.className = 'file-item';
            that.img = document.createElement('img');
            that.img.src = 'img/folder-b.png';
            that.span = document.createElement('span');
            that.span.className = 'folder-name';
            that.span.style.display = 'none';

            that.input = document.createElement('input');
            that.input.className = 'editor';
            that.input.style.display = 'block'
            that.input.value = '新建文件夹';

            that.is = document.createElement('i');
            that.is.style.background = 'none';
            that.is.className = 'checked';

            that.folders.append(that.div);
            that.div.append(that.img, that.span, that.input, that.is);
            that.input.select(); 
            // console.log(that.input.value);
            that.input.onblur = function(){
                let ary = [];
                let val = this.value;
                console.log(that.data);
                for(let attr in that.data){
                    
                };
            };
        };
        this.create.onmouseup = function(){
            that.input.style.display = 'none';
            that.span.style.display = 'block';
            that.span.innerHTML = '新建文件夹';
        };
    };
};
new Create(data);