<template>
    <div class="outer-container">

        <div class="container">
            <div class="loader" v-if="processing"></div>
        </div>

        
        <div class="container overlay">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="150">
            <div class="form">
                <span></span>
                <input v-model="email" type="text" name="email" placeholder=" Email"  autofocus>
                <span></span>
                <input v-model="password" type="password" name="password" placeholder=" Password">
                <div class="btn">
                    <button @click="login()">Login</button>
                    <button @click="signUp()">Sign Up</button>
                </div>
                <div>
                    <div class="text">
                        Login as<button class="test" @click="loginAsTest">Test User</button>
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
            processing: false,
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
            // * setTimeout for data-reactivity to work (dont ask me why)
            setTimeout(() => {
                this.processing = true
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(response => {
                        console.log(response)
                        this.login()
                    })
                    .catch(error => {
                        this.processing = false
                        setTimeout(() => {
                            alert('Enter a valid email/password format ')
                        }, 100)
                  var errorCode = error.code;
                  var errorMessage = error.message;
                })
            }, 200)
        },
        login () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( resp => {
                    console.log(resp)
                    window.location.href = `/movies`
                })
                .catch( err => {
                    alert(err)
                })
        }
    },
}
</script>


<style scoped>
* {
    /* border:1px solid red; */
    transition: 0.2s;
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
    min-height:550px;
    width:100%;
    position: absolute;
    background-size: cover;
    padding-top:85px;
}
.overlay {
    background: rgba(8, 21, 37, 0.4);
}
.text button, .text {
    font-size: 1rem;
    margin-top:10px;
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
    margin-top:10px;
    justify-content: space-between;
}
.form {
    padding:3rem 4rem;
    margin:-10px auto auto auto;
    display: flex;
    flex-direction: column;
    background: rgba(17, 19, 22, 0);
}
img {
    margin:0 auto 0 auto;
}
button {
    margin-top:2rem;
    padding:12px 20px;
    width:47%;
    background: rgb(0, 94, 115);
    border:none;
    border-radius:3px;
    color:white;
    outline:none;
    cursor:pointer;
}
button:hover {
    background:rgb(14, 103, 125);
}
input {
    margin-top:33px;
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
    border-bottom:aqua 1px solid;
}
::placeholder {
    color:rgb(175, 175, 175);
}

.loader {
  border: 10px solid #f3f3f3ef; /* Light grey */
  border-top: 10px solid #0d4a72e8; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
  position:absolute;
  right:47%;
  top:30%;
  background: rgba(0, 0, 0, 0.67);
  z-index:9;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}



@media only screen and (max-height: 600px) {
  .container {
    padding-top:100px;
  }
}
@media only screen and (min-height: 650px) {
  .container {
    padding-top:165px;
  }
}
@media only screen and (min-height: 1200px) {
  .container {
    padding-top:280px;
  }
}
</style>
