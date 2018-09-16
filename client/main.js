var app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        products: [],
        cart: [],
        keyup : ""
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
        },
        addTocart(product) {
            this.cart.push(product)
        },
        getCart() {
            axios({
                url: url+`/cart`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( found => {
                this.cart = found.data.cart
            })
            .catch( err => console.log(err))
        }, 
        categoryin(id) {
            alert('masuk')
        }
    },
    mounted() {
        this.checkLogin()
        this.getAllProducts()
        this.getCart()
    },
    watch: {
        isLogin() {
            this.checkLogin()
        },
        keyup() {
            axios({
                url: url+`/products/${this.keyup}`,
                method: 'get'
            })
            .then( found => {
                this.products = found.data
            })
            .catch(err=> console.log(err))
        }
    }
})