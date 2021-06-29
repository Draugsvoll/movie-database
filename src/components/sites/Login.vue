<template>
    <div class="outer-container">

        <div class="container">
        </div>
        
        <div class="container overlay">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="150">
            <div class="form">
                <span></span>
                <input v-model="email" type="text" name="email" placeholder=" Email"  autofocus>
                <br>
                <br>
                <span></span>
                <input v-model="password" type="text" name="password" placeholder=" Password">
                <div class="btn">
                    <button @click="login">Login</button>
                    <button @click=signUp()>Sign Up</button>
                </div>
                <br>
                <br>
                <div>
                    <div class="text">
                        Continue as<button class="test" @click="loginAsTest">Test User</button>
                    </div> 
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
            firebase.auth().signInWithEmailAndPassword('test_user@gmail.com', 'pass123')
                .then( resp => {
                    console.log(resp)
                    window.location.href = `/movies`
                })
                .catch( err => {
                    alert('Wrong username/password' + err)
                })
        },
        signUp () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(response => console.log(response))
                .catch(function(error) {
                    alert('Invalid username/password format')
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
    },
}
</script>


<style scoped>
* {
    /* border:1px solid red; */
}
.outer-container {
    position:relative;
}
.container {
    padding:0;
    display: flex;
    flex-direction: column;
    background: url('../../assets/bg.jpg') no-repeat center center fixed; 
    height:100vh;
    width:100%;
    position: absolute;
    background-size: cover;
    z-index: 9;
}
.overlay {
    background:rgba(0, 3, 16, 0.55);
}
.text button, .text {
    font-size: 0.9rem;
    margin-top:-10px;
}
.test {
    background:rgba(0,0,0,0);
    border:none;
    outline:none;
    color: lightblue;
    cursor:pointer;
    text-decoration: underline;
    padding:0 !important;
    text-align: left;
    margin-left:5px;
    /* width:3.5rem !important; */
}
.test:hover {
    background:rgba(0,0,0,0);
    color: rgb(248, 250, 250);
}
.btn {
    display: flex;
    width:100%;
}
.form {
    padding:3rem 4rem;
    margin:20px auto auto auto;
    display: flex;
    flex-direction: column;
    background: rgba(17, 19, 22, 0);
}
img {
    margin:130px auto 0 auto;
}
button {
    margin-top:2rem;
    margin-right:10px;
    padding:12px 20px;
    min-width:100px;
    background:rgb(10, 120, 148);
    border:none;
    border-radius:3px;
    color:white;
    outline:none;
    cursor:pointer;
}
button:hover {
    background:rgba(2, 33, 43, 1);
    /* color: rgb(53, 219, 241); */
    /* border: 1px solid rgb(53, 219, 241); */
}
input {
    margin: 0.2rem 0;
    width:16rem;
    font-size: 17px;
    height:1.5rem;
    background:rgba(255,255,255,0);
    border:none;
    color: rgb(233, 240, 245);
    border-bottom:1px solid white;
    outline:none;
}
input:focus {
    /* border-bottom:rgb(164, 241, 252) 1px solid; */
    border-bottom:rgb(133, 246, 250) 1px solid;
}
::placeholder {
    font-style:italic;
    color:rgb(131, 131, 131);
}
</style>
