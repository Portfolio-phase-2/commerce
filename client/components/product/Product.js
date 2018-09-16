let productComponent = `
<div class="col s6 m4 l4">
    <div class="card">
        <div class="card-image">
            <img alt="" :src="data.image" class="responsive-img"/>
            <span class="card-title blue-text"> {{data.name}} </span>
        </div>
        <div class="card-content">
            <i class="material-icons tiny">money</i> Rp.{{data.price}} <br />
            <i class="material-icons tiny">tag</i> {{data.category.name}} <br />
        </div>

        <div class="card-action">
            <a class="modal-trigger" href="#modalSignin" v-if="!status">Signin to Buy</a>
            <a href="#" v-else @click="addToCart(data._id, data.name, data.price)">Add To Cart</a>
        </div>
    </div>
</div>
`

Vue.component('product-list', {
    props: ['data', 'status'],
    methods: {
        addToCart(product) {
            axios({
                url: url+`/cart`,
                method: 'post',
                data: {
                    orderid: product
                }, 
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( found => console.log(this.$parent.getCart()))
        }
    },
    template: productComponent,
})