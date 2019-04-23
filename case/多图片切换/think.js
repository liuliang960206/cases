const before1 = document.getElementById('before1');
const before2 = document.getElementById('before2');
const after1 = document.getElementById('after1');
const after2 = document.getElementById('after2');
const imgs = document.querySelectorAll('#oDiv1>img')
const imgs2 = document.querySelectorAll('#oDiv2>img')
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const span1 = document.getElementById('span1');
const span2 = document.getElementById('span2');
const pre = document.getElementById('pre');
const next = document.getElementById('next');

//左右两侧
function banner(after, before, imgs, p, span, a, b) {
    function fn(index1, n, m) {
        imgs[index].style.display = 'none';
        index = index1;
        index == n ? index = m : null;
        p.innerHTML = `这是第${index + 1}张图片`;
        span.innerHTML = `${(index + 1)}/${a}`;
        imgs[index].style.display = 'block';
    };
    let index = 0; //当前图片的序号 当点击左侧按钮时，让序号-1；当点击右侧按钮时候，让序号+1  (为什么index=0可以，index=1不可以？)
    after.onclick = function () {
        fn(index + 1, a, 0);
    };
    before.onclick = function () {
        fn(index - 1, -1, b);
    };
};
banner(after1, before1, imgs, p1, span1, 4, 3);
banner(after2, before2, imgs2, p2, span2, 3, 2);

// 上一组下一组封装
let index = 0;
let index2 = 0;
function left1(imgs, p, span, a, b) {
    imgs[index].style.display = 'none';
    index--;
    index == -1 ? index = a : null;
    p.innerHTML = `这是第${index + 1}张图片`;
    span.innerHTML = `${(index + 1)}/${b}`;
    imgs[index].style.display = 'block';
};

function left2(imgs, p, span, a, b) {
    imgs[index2].style.display = 'none';
    index2--;
    index2 == -1 ? index2 = a : null;
    p.innerHTML = `这是第${index2 + 1}张图片`;
    span.innerHTML = `${(index2 + 1)}/${b}`;
    imgs[index2].style.display = 'block';
};

function right1(imgs, p, span, a, b) {
    imgs[index].style.display = 'none';
    index++;
    index == a ? index = 0 : null;
    p1.innerHTML = `这是第${index + 1}张图片`;
    span1.innerHTML = `${(index + 1)}/${a}`;
    imgs[index].style.display = 'block';
};

function right2(imgs, p, span, a, b){
    imgs[index2].style.display = 'none';
    index2++;
    index2 == a ? index2 = 0 : null;
    p.innerHTML = `这是第${index2 + 1}张图片`;
    span.innerTML = `${(index2 + 1)}/${a}`;
    imgs[index2].style.display = 'block';
};

pre.onclick = function () {
    left1(imgs, p1, span1, 3, 4);
    left2(imgs2, p2, span2, 2, 3);
};

next.onclick = function () {
    right1(imgs, p1, span1, 4);
    right2(imgs2, p2, span2, 3);
};

