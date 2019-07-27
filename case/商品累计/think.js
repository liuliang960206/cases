let ary = [
    {
        price: 12.5
    },
    {
        price: 10.5
    },
    {
        price: 8.5
    },
    {
        price: 8
    },
    {
        price: 14.5
    },
];
class Shop {
    constructor(ary) {
        this.ul = document.querySelector('ul');
        this.i1s = this.ul.querySelectorAll('li>i:nth-of-type(1)');
        this.i2s = this.ul.querySelectorAll('li>i:nth-of-type(2)');
        this.ems = this.ul.querySelectorAll('li>em');
        this.strong1 = this.ul.querySelectorAll('li>span>strong:nth-of-type(1)');
        this.strong2 = this.ul.querySelectorAll('li>span>strong:nth-of-type(2)');
        this.em1 = document.querySelectorAll('.info>span:nth-of-type(1)>em')[0]
        this.em2 = document.querySelectorAll('.info>span:nth-of-type(2)>em')[0]
        this.em3 = document.querySelectorAll('.info>span:nth-of-type(3)>em')[0];
        this.num = [0, 0, 0, 0, 0];
        this.price = ary;
        // this.count = 0;
    };
    add() {
        for (let i = 0; i < this.i2s.length; i++) {
            this.i2s[i].onclick = () => {
                this.num[i]++;
                this.ems[i].innerHTML = this.num[i];
                this.subtotal();
                this.total();
                this.totalPrice();
                this.highestPrice();
            }
        };
    };
    subtract() {
        for (let i = 0; i < this.i1s.length; i++) {
            this.i1s[i].onclick = () => {
                if (this.num[i] === 0) return;
                this.num[i]--;
                this.ems[i].innerHTML = this.num[i];
                this.subtotal();
                this.total();
                this.totalPrice();
                this.highestPrice();
            }
        }
    };
    subtotal() {
        for (let i = 0; i < this.strong2.length; i++) {
            this.strong2[i].innerHTML = this.price[i].price * this.num[i] + '元';
        };
    };
    total() {
        let count = 0;
        for (let i = 0; i < this.ems.length; i++) {
            count += parseFloat(this.ems[i].innerHTML);
        };
        this.em1.innerHTML = count;
    };
    totalPrice() {
        let count = 0;
        for (let i = 0; i < this.ems.length; i++) {
            count += parseFloat(this.strong2[i].innerHTML);
        };
        this.em2.innerHTML = count;
    };
    highestPrice() {
        let max = 0;
        for (let i = 0; i < this.ems.length; i++) {
            if(this.ems[i] !== '0'){
                let price = parseFloat(this.strong2.innerHTML);
                if(max<price){
                    max = price;
                    this.em3.innerHTML = max;
                    console.log(this.em3)
                };
            };
        };
    };
};
let c = new Shop(ary);
c.add();
c.subtract();
c.subtotal();
c.total();
c.totalPrice();
c.highestPrice();