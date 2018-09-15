let navbarComponent = `
<header>
    <nav class="indigo">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" class="brand-logo"> {{titleApp}} </a>
                <a href="#" data-activates="mobile-menu" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="#"> <i class="material-icons">add</i> </a></li>
                    <li v-if="!status"><a class="waves-effect waves-light modal-trigger" href="#modalSignin"> Sign In </a></li>
                    <li v-else><a class="waves-effect waves-lightr" href="#" @click="doLogout"> Sign Out </a></li>
                </ul>
                <ul class="side-nav" id="mobile-menu">
                    <li>
                        <div class="userView">
                            <div class="background">
                                <img src="http://lorempixel.com/output/abstract-q-c-640-480-10.jpg" alt="Background Sidenav">
                            </div>
                            <a href="#!user"><img class="circle" src="http://lorempixel.com/output/people-q-c-640-480-9.jpg"
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

    <!-- Modal Structure -->
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

</header>
`

Vue.component('navbar-header', {
    props: ['status'],
    data() {
        return {
            titleApp: 'victoryShop',
            email: '',
            password: ''
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
        }
    },
    watch: {
    },
    template: navbarComponent
})