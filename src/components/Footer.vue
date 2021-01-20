<template>
    <footer>

        <div class="footer-container">
            <div class="column">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="120">
            </div>
          </div>

          <!-- Copyright -->
        <div class="copyright"> <a>© 2021 Copyright | Ove Henrik Draugsvoll</a> </div>

    </footer>
</template>





<style scoped>
i {
  cursor:pointer;
}
i:hover {
color:rgb(100, 184, 218);
}
footer{
  background-color: black;
  min-height: 180px;
  z-index:10;
  margin-top:50px;
}
.copyright {
    display: flex;
    justify-content: center;
    font-size: 0.7rem !important;
    margin-top:10px;
    color:rgb(141, 155, 156);
    /* margin-bottom:55px; */
}

.footer-container {
    display: inline-flex;
    justify-content: space-evenly;
    width:100%;
    flex-wrap: wrap;
}
.link {
  margin:4px;
  margin-left:0px;
  color:rgb(209, 213, 214);
  font-size: 13px !important;
}

.footer-headline {
  font-size: 17px !important; 
  margin-bottom:5px;
  margin-top:10px !important;
}

footer a {
  text-decoration:none;
  /* color:rgb(216, 223, 228); */
}
.column {
    margin:18px;
}
</style>