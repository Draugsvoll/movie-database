<template>
    <div class="outer-container">
        <div class="container">
        </div>
        <div class="container overlay">
        <!-- <div class="logo"></div> -->
        <img src="../../assets/logo2.png" alt="" width="250">
            <div class="form">
                <span>Username:</span>
                <input type="text" name="username" placeholder="Username">
                <br>
                <br>
                <br>
                <span>Password:</span>
                <input type="text" name="password" placeholder="Password">
                <div class="btn">
                    <button>Login</button>
                    <button>Sign Up</button>
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
export default {
    methods: {
        loginAsTest () {
            window.location.href = `/movies`
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
}
.container {
    padding:0;
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
    padding:4rem 6rem;
    margin:0 auto;
    display: flex;
    flex-direction: column;
}
img {
    margin:0 auto;
}
input {
    margin: 0.5rem 0;
}
button {
    margin:auto;
}
</style>