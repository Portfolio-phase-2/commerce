var app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        products: []
    },
    methods: {
        checkLogin() {
            let token = localStorage.getItem('token')
            if(token) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },
        getAllProducts() {
            axios({
                url: url+`/products`,
                method: 'get'
            })
            .then( found => {
                this.products = found.data
            })
            .catch(err=> console.log(err))
        }
    },
    mounted() {
        this.checkLogin()
        this.getAllProducts()
    },
    watch: {
        isLogin() {
            this.checkLogin()
        }
    }
})