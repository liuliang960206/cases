class Banner {
    constructor() {
        this.before1 = document.getElementById('before1');
        this.before2 = document.getElementById('before2');
        this.after1 = document.getElementById('after1');
        this.after2 = document.getElementById('after2');
        this.imgs1 = document.querySelectorAll('#oDiv1>img')
        console.log(this.imgs)
        this.imgs2 = document.querySelectorAll('#oDiv2>img')
        this.p1 = document.getElementById('p1');
        this.p2 = document.getElementById('p2');
        this.span1 = document.getElementById('span1');
        this.span2 = document.getElementById('span2');
        this.pre = document.getElementById('pre');
        this.next = document.getElementById('next');
        this.index = 0;
    };
    changeLeft(left,idx) {
        left.onclick = ()=>{
            this[`imgs${idx}`][this.index].style.display = 'none';
            this.index--;
            this.index === -1 ? this.index = this[`imgs${idx}`].length-1 : null;
            this[`imgs${idx}`][this.index].style.display = 'block';
            this.p1.innerHTML = `这是第${this.index+1}张图片`;
            this.span1.innerHTML = `${(this.index + 1)}/${this[`imgs${idx}`].length}`
        }
    }
    changeRight(right,idx) {
        right.onclick = () => {
            this[`imgs${idx}`][this.index].style.display = 'none';
            this.index++;
            this.index === this[`imgs${idx}`].length ? this.index = 0 : null;
            this[`imgs${idx}`][this.index].style.display = 'block';
            this.p1.innerHTML = `这是第${this.index+1}张图片`;
            this.span1.innerHTML = `${(this.index + 1)}/${this[`imgs${idx}`].length}`
        };
    };
    
};
let pic1 = new Banner();
let pic2 = new Banner();
pic1.changeLeft(before1,1);
pic1.changeRight(after1,1);
pic2.changeLeft(before2,2);
pic2.changeRight(after2,2);