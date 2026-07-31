<template>
    <footer>
        <div class="footer-container">
            <div class="column">
                <p class="powered">Powered by</p>
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB" width="100">
                <div class="icons">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        <div class="copyright">© {{currentYear}} · Ove Henrik Draugsvoll</div>
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
footer {
  background: transparent;
  min-height: auto;
  z-index: 10;
  padding: clamp(1.5rem, 1.25rem + 0.5vw, 2.25rem) var(--page-pad-x, 1.75rem) clamp(1.15rem, 1rem + 0.35vw, 1.75rem);
  margin-top: 0.75rem;
  border-top: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
}
.icons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-size: var(--text-md, 1rem);
  color: var(--text-muted, #636c78);
  margin-top: 0.85rem;
}
.icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  color: var(--text-secondary, #97a0aa);
  text-decoration: none;
  transition: color var(--transition-fast, 0.14s ease),
              background var(--transition-fast, 0.14s ease),
              transform var(--transition-fast, 0.14s ease);
}
.icons a:hover {
  color: var(--white-font, #f4f6f8);
  background: var(--primary-muted, rgba(41, 171, 194, 0.14));
  transform: translateY(-1px);
}
.copyright {
  display: flex;
  justify-content: center;
  font-size: var(--text-2xs, 0.75rem);
  color: var(--text-muted, #636c78);
  margin-top: 0.75rem;
  letter-spacing: 0.02rem;
}
.powered {
  color: var(--text-secondary, #97a0aa);
  text-align: center;
  font-size: var(--text-2xs, 0.75rem);
  font-weight: 500;
  letter-spacing: 0.06rem;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}
.footer-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.column img {
  width: 5rem;
  opacity: 0.8;
  transition: opacity var(--transition-fast, 0.14s ease);
}
.column img:hover {
  opacity: 1;
}
</style>
