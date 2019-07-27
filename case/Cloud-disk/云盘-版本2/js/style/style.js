const fBox = document.querySelector('#fBox');
const folders = document.querySelector('.folders');
const kuang = document.querySelector('.kuang')
const fEmpty = document.querySelector('.f-empty');
const create = document.querySelector('#create');
const fullTipBox = document.querySelector('.full-tip-box');
const breadNav = document.querySelector('.bread-nav');
const head = document.getElementById('head');
const checkedAll = document.getElementById('checkedAll');
const rename = document.getElementById('rename');
const tanbox = document.getElementById('tanbox');
const deleX = document.querySelector('#tanbox .conf i');
const deleYes = document.querySelectorAll('#tanbox .conf .conf-btn a')[0];
const deleCancel = document.querySelectorAll('#tanbox .conf .conf-btn a')[1];
const treeMenu = document.querySelector('.tree-menu');

let remove = document.getElementById('remove');
const moveTanbox = document.querySelector('.modal-tree');
const moveYes = moveTanbox.querySelectorAll('.ok')[0];
const moveCancel = moveTanbox.querySelectorAll('.cancel')[0];
const moveX = moveTanbox.querySelectorAll('.icon_close')[0];

// 新建文件夹提示框匀速运动
function topTip(val){
    fullTipBox.innerHTML = val;
    startMove({
        obj:fullTipBox,
        json:{
            top:0
        },
        durtion:500,
        fx:'linear',
        cb(){
            setTimeout(()=>{
                startMove({
                    obj:fullTipBox,
                    json:{
                        top:-40
                    },
                    durtion:500
                })
            },1000)
        }
    });
};

