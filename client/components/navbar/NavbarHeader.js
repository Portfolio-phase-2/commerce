let navbarComponent = `
<header>
    <nav class="indigo">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" class="brand-logo"> {{titleApp}} </a>
                <a href="#" data-activates="mobile-menu" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li> {{cart.length}} </li>
                    <li> <a class="modal-trigger" href="#modalCart"> <i class="material-icons">shopping_cart</i> </a></li>
                    <li v-if="!status"><a class="waves-effect waves-light modal-trigger" href="#modalSignin"> Sign In </a></li>
                    <li v-else><a class="waves-effect waves-lightr" href="#" @click="doLogout"> Sign Out </a></li>
                </ul>
                <ul class="side-nav" id="mobile-menu">
                    <li>
                        <div class="userView">
                            <div class="background">
                                <img src="#" alt="Background Sidenav">
                            </div>
                            <a href="#!user"><img class="circle" src="#"
                                    alt="User Image Sidenav"></a>
                            <a href="#!name"><span class="white-text name">Asrul Harahap</span></a>
                            <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><a href="#"> <i class="material-icons">add</i> </a></li>
                    <li><a href="#"> <i class="material-icons">add</i> </a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Modal Login -->
    <div id="modalSignin" class="modal">
        <div class="modal-content">
            <h5 class="indigo-text center">Login User</h5>
            <form v-on:submit.prevent="onLogin">
                <div class="input-field col s12">
                    <input type="email" id="email" class="validate" v-model="email">
                    <label for="email" data-error="wrong" data-success="right">Email</label>
                </div>
                <div class="input-field col s12">
                    <input type="password" id="password" class="validate" v-model="password">
                    <label for="password" data-error="wrong" data-success="right">Password</label>
                </div>
                <div class="row">
                    <button class="btn indigo modal-action modal-close right waves-effect waves-light" type="submit" name="action">Sign In</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Cart -->
    <div id="modalCart" class="modal">
        <div class="modal-content">
            <h5 class="indigo-text center">Your Cart</h5>
            <table class="highlight">
                <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cart in cart">
                    <td>{{cart.name}}</td>
                    <td>Rp.{{cart.price}}</td>
                    <td><a href="#" @click="removeCart(cart._id)">Remove</a></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                    <th><a class="btn modal-action modal-close modal-trigger" href="#modalCheckOut">Checkout</a></th>
                </tr>
                </tbody>
            </table>
                    
        </div>
    </div>

    <!-- Modal Cart -->
    <div id="modalCheckOut" class="modal">
        <div class="modal-content">
            <h5 class="indigo-text center">CheckOut</h5>
            <form>
                ini belum selesai
            </form>
            <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">textsms</i>
          <input type="text" id="autocomplete-input" class="autocomplete">
          <label for="autocomplete-input">Autocomplete</label>
        </div>
      </div>
    </div>
  </div>
            </form>                    
        </div>
    </div>

</header>
`

Vue.component('navbar-header', {
    props: ['status', 'cart'],
    data() {
        return {
            titleApp: 'uniqShop',
            email: '',
            password: '',
            total: 0
        }
    },
    methods: {
        doLogout(){
            localStorage.removeItem('token')
            window.location = '/'
        },
        onLogin() {
            axios({
                url: url+`/signin`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then( found => {
                localStorage.setItem('token', found.data.token)
                window.location = '/'
            })
            .catch( err => console.log(err))
        }, 
        removeCart(id) {
            axios({
                url: url+`/cart`,
                method: 'put',
                data: {
                    orderid: id
                }, 
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( found => console.log(this.$parent.getCart()))
        }
    },
    watch: {
    },
    template: navbarComponent
})