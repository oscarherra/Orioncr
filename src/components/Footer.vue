<template>
  <footer class="site-footer">
    <div class="footer-content">
      
      <div class="footer-logo">Orion.cr</div>

      <nav class="footer-nav">
        <a href="#">Sobre Nosotros</a>
        <a href="#">Contacto</a>
        <a href="#">Términos de Servicio</a>
        <a href="#">Política de Privacidad</a>
      </nav>

      <div class="social-links">
        <a href="#" class="social-link twitter" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
        </a>
        <a href="https://www.instagram.com/orio.ncr?utm_source=ig_web_button_share_sheet&igsh=MTNhanVvbzQwbmZ5Mg==" class="social-link instagram" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.585-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85C2.296 3.862 3.844 2.318 7.15 2.17c1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
        </a>
        <a href="#" class="social-link facebook" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
        </a>
      </div>

      <p class="copyright">
        © {{ new Date().getFullYear() }} Orion.cr. Todos los derechos reservados.
      </p>

    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #f8f9fa; /* Un gris muy claro */
  border-top: 1px solid #e9ecef;
  padding: 3rem 2rem;
  font-family: 'Poppins', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem; /* Espacio entre los elementos: logo, nav, social, etc. */
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #212529;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap; /* Para que se ajuste en pantallas pequeñas */
  justify-content: center;
  gap: 1.5rem;
}

.footer-nav a {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease-in-out;
}

.footer-nav a:hover {
  color: #212529;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  transition: transform 0.2s ease-in-out;
}

.social-link:hover {
  transform: translateY(-3px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Colores de marca */
.social-link.twitter    { background-color: #1DA1F2; }
.social-link.instagram  { background: #d6249f; background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); }
.social-link.facebook   { background-color: #1877F2; }

.copyright {
  font-size: 0.85rem;
  color: #6c757d;
  margin-top: 1rem; /* Espacio extra arriba del copyright */
}
</style>