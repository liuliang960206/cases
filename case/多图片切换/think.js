// 112233哈哈哈

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


function banner(after, before, imgs, p, span, a, b) {
    
    function fn(index1,n,m) {
        imgs[index].style.display = 'none';
        index = index1;
        index == n ? index = m : null;
        p.innerHTML = `这是第${index + 1}张图片`;
        span.innerHTML = `${(index + 1)}/${a}`;
        imgs[index].style.display = 'block';
    };
    let index = 0; //当前图片的序号 当点击左侧按钮时，让序号-1；当点击右侧按钮时候，让序号+1  (为什么index=0可以，index=1不可以？)
    after.onclick = function () {
        fn(index+1,a,0);
    };
    before.onclick = function () {
        fn(index-1,-1,b);
    };
};
banner(after1, before1, imgs, p1, span1, 4, 3);
banner(after2, before2, imgs2, p2, span2, 3, 2);



// 当点击上一组，左侧图片序号-1，右侧图片序号-1 
let index = 0;
let index2 = 0;
pre.onclick = function () {
    imgs[index].style.display = 'none';
    index--;
    index == -1 ? index = 3 : null;
    p1.innerHTML = `这是第${index + 1}张图片`;
    span1.innerHTML = `${(index + 1)}/4`;
    imgs[index].style.display = 'block';

    imgs2[index2].style.display = 'none';
    index2--;
    index2 == -1 ? index2 = 2 : null;
    p2.innerHTML = `这是第${index2 + 1}张图片`;
    span2.innerHTML = `${(index2 + 1)}/3`;
    imgs2[index2].style.display = 'block';
};

next.onclick = function () {
    imgs[index].style.display = 'none';
    index++;
    index == 4 ? index = 0 : null;
    p1.innerHTML = `这是第${index + 1}张图片`;
    span1.innerHTML = `${(index + 1)}/4`;
    imgs[index].style.display = 'block';

    imgs2[index2].style.display = 'none';
    index2++;
    index2 == 3 ? index2 = 0 : null;
    p2.innerHTML = `这是第${index2 + 1}张图片`;
    span2.innerHTML = `${(index2 + 1)}/3`;
    imgs2[index2].style.display = 'block';
};

// // 上一组下一组封装？？？
// function fn(imgs, index, a, p, span, b) {
//     imgs[index].style.display = 'none';
//     index--;
//     index == -1 ? index = a : null;
//     p.innerHTML = `这是第${index + 1}张图片`;
//     span.innerHTML = `${(index + 1)}/${b}`;
//     imgs[index].style.display = 'block';
// };
// pre.onclick = function () {
//     fn(imgs, index, 3, p1, span1, 4);
//     // fn(imgs2, index2, 2, p2, span2, 3);
// };