<template>
    <div class="outer-container">

        <div class="container bg-layer"></div>

        <div class="container overlay">
            <div class="login-card">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB">
                <h1 class="welcome">Welcome back</h1>
                <p class="subtitle">Sign in to browse movies &amp; TV</p>
                <div class="form">
                    <label class="field">
                        <span class="field-label">Email</span>
                        <input v-model="email" type="text" name="email" placeholder="you@example.com" autofocus>
                    </label>
                    <label class="field">
                        <span class="field-label">Password</span>
                        <input v-model="password" type="password" name="password" placeholder="••••••••">
                    </label>
                    <div class="btn">
                        <button class="primary" @click="login()">Login</button>
                        <button class="secondary" @click="signUp()">Sign Up</button>
                    </div>
                    <div class="text">
                        Login as <button class="test" @click="loginAsTest">Test User</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="loader-wrap" v-if="processing">
            <div class="loader"></div>
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
.outer-container {
    position: relative;
    min-height: 100vh;
}
.container {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 550px;
    width: 100%;
    position: absolute;
    inset: 0;
}
.bg-layer {
    background: url('../../assets/bg.jpg') no-repeat center center fixed;
    background-size: cover;
}
.overlay {
    background: linear-gradient(
        160deg,
        rgba(8, 16, 28, 0.72) 0%,
        rgba(13, 15, 18, 0.85) 50%,
        rgba(8, 21, 37, 0.9) 100%
    );
    align-items: center;
    justify-content: center;
    padding: var(--space-xl, 1.75rem) var(--page-pad-x, 1.35rem);
}
.login-card {
    width: 100%;
    max-width: 24rem;
    padding: 2.15rem 1.9rem 1.85rem;
    background: rgba(14, 16, 20, 0.78);
    backdrop-filter: blur(16px) saturate(1.15);
    -webkit-backdrop-filter: blur(16px) saturate(1.15);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: var(--radius-xl, 14px);
    box-shadow: var(--shadow-lg, 0 14px 40px rgba(0,0,0,0.55));
    display: flex;
    flex-direction: column;
    align-items: center;
}
img {
    width: 3.75rem;
    margin-bottom: 1rem;
}
.welcome {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.015rem;
    color: var(--white-font, #f4f6f8);
}
.subtitle {
    margin: 0.3rem 0 1.35rem;
    font-size: 0.84rem;
    color: var(--text-secondary, #97a0aa);
}
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
}
.field {
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
    width: 100%;
}
.field-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06rem;
    text-transform: uppercase;
    color: var(--text-muted, #636c78);
}
input {
    letter-spacing: 0.01rem;
    width: 100%;
    font-size: 0.9rem;
    height: 2.5rem;
    padding: 0 0.8rem;
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: var(--radius-md, 7px);
    color: var(--white-font, #f4f6f8);
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
input:focus {
    border-color: var(--primary-color, #29abc2);
    background: rgba(41, 171, 194, 0.055);
    box-shadow: 0 0 0 3px var(--primary-muted, rgba(41, 171, 194, 0.14));
}
::placeholder {
    color: var(--text-muted, #636c78);
}
.btn {
    display: flex;
    width: 100%;
    margin-top: 0.35rem;
    gap: 0.6rem;
}
.btn > button {
    letter-spacing: 0.02rem;
    font-size: 0.84rem;
    font-weight: 600;
    flex: 1;
    padding: 0.7rem 0.9rem;
    border: none;
    border-radius: var(--radius-md, 7px);
    color: white;
    outline: none;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.14s ease, box-shadow 0.18s ease;
}
.btn > button:hover {
    transform: translateY(-1px);
}
.btn > button:active {
    transform: translateY(0);
}
.primary {
    background: var(--primary-color, #29abc2);
    box-shadow: 0 4px 16px var(--primary-glow, rgba(41, 171, 194, 0.35));
}
.primary:hover {
    background: var(--primary-hover, #3bc4dc);
}
.secondary {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.secondary:hover {
    background: rgba(255, 255, 255, 0.14);
}
.text {
    font-size: 0.88rem;
    letter-spacing: 0.02rem;
    margin-top: 0.5rem;
    text-align: center;
    color: var(--text-secondary, #9aa3ad);
}
.test {
    background: transparent;
    border: none;
    outline: none;
    color: var(--primary-color, #29abc2);
    cursor: pointer;
    text-decoration: none;
    padding: 0 !important;
    margin-left: 0.25rem;
    font-size: inherit;
    font-weight: 600;
    transition: color 0.15s ease;
}
.test:hover {
    color: var(--primary-hover, #3bc4dc);
    text-decoration: underline;
}
.loader-wrap {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
    z-index: 20;
}
.loader {
    border: 3px solid rgba(255, 255, 255, 0.12);
    border-top: 3px solid var(--primary-color, #29abc2);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media only screen and (max-width: 420px) {
    .login-card {
        padding: 2rem 1.35rem 1.5rem;
    }
    .btn {
        flex-direction: column;
    }
}
</style>
