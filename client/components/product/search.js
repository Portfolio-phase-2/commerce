let searchComponent = `
<div>
    <br>
    <label for="search">Search</label>
    <input type="search" v-model="search" id="search">
</div>
`

Vue.component('search-product', {
    data() {
        return {
            search: ''
        }
    },
    watch : {
        search : function () {
            this.$emit('x',this.search)
        }
    },
    methods: {
        searchData() {
        }
    },
    template: searchComponent,
})