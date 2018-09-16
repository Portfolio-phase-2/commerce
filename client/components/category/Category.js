let categoryComponent = `
<ul class="collection">
    <li class="collection-item center indigo white-text">Category</li>
    <li class="collection-item"> <a href="#" @click="allCategory">All Category</a> </li>
    <li class="collection-item" v-for="(category, i) in categories" :key="i">
        <a href="#" @click="searchCategory(category._id)"> {{category.name}} </a> </li>
</ul>
`

Vue.component('category-product', {
    created() {
        this.getCategory()
    },
    data() {
        return {
            categories: []
        }
    },
    methods: {
        searchCategory(id){
            this.$emit('categoryproduct',id)
        },
        getCategory() {
            axios({
                url: url+`/category`,
                method: 'get'
            })
            .then( found => {
                this.categories = found.data
            })
            .catch( err => console.log(err))
        },
        allCategory() {
            this.$parent.getAllProducts()
        }
    },
    template: categoryComponent
})