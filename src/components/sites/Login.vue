<template>
    <div class="outer-container">
        <div class="container">
        </div>
        <div class="container overlay">
        <!-- <div class="logo"></div> -->
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="150">
            <div class="form">
                <span>email:</span>
                <input v-model="email" type="text" name="email" placeholder="Email">
                <br>
                <br>
                <span>Password:</span>
                <input v-model="password" type="text" name="password" placeholder="Password">
                <div class="btn">
                    <button @click="login">Login</button>
                    <button @click=signUp()>Sign Up</button>
                </div>
                <br>
                <br>
                <div> 
                    Continue as
                    <button class="test" @click="loginAsTest">Test User</button>
                </div>
            </div>
        </div>
    </div>
    
</template>


<script>
import firebase from 'firebase'
require('firebase/auth')

export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        loginAsTest () {
            window.location.href = `/movies`
        },
        signUp () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(response => console.log(response))
                .catch(function(error) {
                // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
            });
        },
        login () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( resp => {
                    console.log(resp)
                    window.location.href = `/movies`
                })
                .catch( err => {
                    alert('Wrong username/password' + err)
                })
        }
    }
}
</script>


<style scoped>
/* .logo {
    background-image: url('../../assets/logo.png');
} */
.outer-container {
    position:relative;
    font-size: 0.9rem;
}
.container {
    padding:0;
    display: flex;
    flex-direction: column;
    background-image: url('../../assets/bg.jpg');
    height:100vh;
    width:100%;
    position: absolute;
    background-size: cover;
    z-index: 9;
}
.form {
    background:rgba(0,0,0,0.85);
}
.overlay {
    background:rgba(0, 3, 16, 0.1);
}
.test {
    background:rgba(0,0,0,0);
    border:none;
    outline:none;
    color: lightblue;
    cursor:pointer;
    text-decoration: underline;
}
.btn {
}
.form {
    padding:3rem 7rem;
    margin:3% auto auto auto;
    display: flex;
    flex-direction: column;
}
img {
    margin:auto auto 0 auto;
}
input {
    margin: 0.5rem 0;
    width:12rem;
    height:1.5rem;
    background:rgba(255,255,255,0);
    border:none;
    color:white;
    border-bottom:1px solid white;
    outline:none;
}
button {
    margin:auto;
}
</style>