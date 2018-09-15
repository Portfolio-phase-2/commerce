let categoryComponent = `
<ul class="collection">
    <li class="collection-item center indigo white-text">Category</li>
    <li class="collection-item"> <a href="#">All Category</a> </li>
    <li class="collection-item" v-for="(category, i) in categories" :key="i">
        <a href="#" > {{category.name}} </a> </li>
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
        getCategory() {
            axios({
                url: url+`/category`,
                method: 'get'
            })
            .then( found => {
                this.categories = found.data
            })
            .catch( err => console.log(err))
        }
    },
    template: categoryComponent
})