<template>
    <div class="container">
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
                 Continue as test user
                <button @click="loginAsTest">Test User</button>
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


<style >
body, html {
    background: black;
}
.container {
}
.btn {
}
.form {
    padding:4rem;
    border:1px solid purple;
    margin:auto;
    display: flex;
    flex-direction: column;
}
input {
    margin: 0.5rem 0;
}
button {
    margin:auto;
}
</style>