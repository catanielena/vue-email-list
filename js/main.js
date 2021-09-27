const app = new Vue({
    el: '#root',
    data: {
        mailList: [],
        mouse : {
            x: 0,
            y: 0 
        },
        canvas: null,
        click: 0,
        ratio : window.devicePixelRatio,
        cssScaleX: null,
        cssScaleY: null
    },
    methods: {
        drawLine(x1, y1, x2, y2) {
            let ctx = this.canvas;
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
          },
        animate: function(e) {
            this.mouse.x = e.clientX * this.cssScaleX;
            this.mouse.y = e.clientY * this.cssScaleY;
            this.canvas.font='30px arial';
            this.canvas.fillText(this.mailList.filter((e,i) => i == this.click), this.mouse.x, this.mouse.y);
            if(this.click >= this.mailList.length - 1) {
                this.click = 0;
            } else {
                this.click++
            }
            console.log(this.mailList.length)
        }
         
    },
    mounted() {
        for(let i=0; i<10; i++) {
            axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then(e => this.mailList.push(e.data.response))
        };
        var c = document.querySelector('canvas');
        c.width = window.innerWidth * this.ratio;
        c.height = window.innerHeight * this.ratio;
        c.style.width = `${window.innerWidth}px`;
        c.style.height = `${window.innerHeight}px`;
        this.cssScaleX = c.width / c.offsetWidth;  
        this.cssScaleY = c.height / c.offsetHeight;
        this.canvas = c.getContext('2d');
    }
})
