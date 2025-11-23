<template>
    <footer>

        <div class="footer-container">
            <div class="column">
                <p>Powered By:</p>
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="120">
                <div class="icons">
                    <a ><i class="fab fa-facebook-f"></i></a>
                    <a ><i class="fab fa-twitter"></i></a>
                    <a ><i class="fab fa-github"></i></a>
                    <a ><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <!-- Copyright -->
        <div class="copyright"> <a>© {{currentYear}} | Ove Henrik Draugsvoll</a> </div>

    </footer>
</template>

<script>
export default {
  name: "FooterCopyright",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
i {
  cursor:pointer;
}
i:hover {
color:rgb(100, 184, 218);
}
footer{
  background: var(--background-color);
  min-height: 180px;
  z-index:10;
  padding:20px;
  padding-top:0px;
}
.icons {
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  /* color:rgb(33, 190, 230); */
  color:rgb(143, 168, 179);
  margin-top:20px;
  margin-bottom:10px;
}
.icons > a:hover {
  transition:0.2s;
  color:white;
}
i:hover {
  color:rgb(227, 245, 248);
}
.copyright {
    display: flex;
    justify-content: center;
    font-size: 0.7rem !important;
    color:rgb(141, 155, 156);
}
p {
  color:rgb(233, 233, 233);
  text-align: center;
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