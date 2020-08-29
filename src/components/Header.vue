<template>
    <header>
        <nav>
            <ul class="nav_links">
                <li><a href="#">Filmer</a></li>
            </ul>
        </nav>
        <a class="cta" href="#"><button>Logout</button></a>
    </header>
</template>













<style  scoped>

li, a, button{
    color:white;
    font-size:28px;
}

.nav_links li a{
    text-decoration: none;
}


header{
    display: flex;
    justify-content: space-between;
    align-items:baseline;
    border-bottom: 1px solid black; 
    padding: 15px 15px 15px 0px;
    background-color: rgb(7, 14, 31);
    height:70px;
    width:100%;
    margin-top:0;
    position: fixed;
    
}


.nav_links li{
    display: inline-block;
    padding: 0px 20px 0 0;
    text-decoration: underline;
}

.nav_links li a{
    transition: all 0.2s ease 0s;
}

.nav_links li a:hover{
    color: rgb(146, 157, 194);
}

button{
    padding: 9px 25px;
    background-color: rgb(14, 28, 48);
    border:1.5px solid rgb(73, 101, 145);
    border-radius: 10px;
    cursor: pointer;
    margin-right: 35px;
    font-size: 26px;
}

button:hover{
    background-color: rgba(22, 41, 78, 0.8);
    border: 1.5px solid rgb(73, 81, 117);
}

</style>