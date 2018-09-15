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
            <i class="material-icons tiny">widgets</i> {{data.stock}} items
        </div>

        <div class="card-action">
            <a href="/auth.html" v-if="!status">Signin to Buy</a>
            <a href="#" v-else>Add To Cart</a>
        </div>
    </div>
</div>
`

Vue.component('product-list', {
    props: ['data', 'status'],
    data() {
        return {
        }
    },
    methods: {
    },
    template: productComponent,
})