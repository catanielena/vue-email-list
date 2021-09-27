const app = new Vue({
    el: '#root',
    data: {
        mailList: []
    },
    mounted() {
        for(let i=0; i<10; i++) {
            axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then(e => this.mailList.push(e.data.response))
        }
    }
})