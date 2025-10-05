const mobile = document.getElementById('mobileMenu');
const openBtn = document.getElementById('openMenu');

if (openBtn) {
  openBtn.addEventListener('click', () => {
    mobile.style.display = 'block';
    mobile.classList.add('show');
    mobile.setAttribute('aria-hidden', 'false');
  });
}

// Cerrar al tocar fuera del menú
if (mobile) {
  mobile.addEventListener('click', (e) => {
    if (!e.target.closest('.sheet')) {
      mobile.style.display = 'none';
      mobile.classList.remove('show');
      mobile.setAttribute('aria-hidden', 'true');
    }
  });
}

// Cerrar al tocar un enlace y redirigir
document.querySelectorAll('#mobileMenu a').forEach((a) => {
  a.addEventListener('click', (e) => {
    mobile.style.display = 'none';
    mobile.classList.remove('show');
    mobile.setAttribute('aria-hidden', 'true');
    // La redirección se hace normalmente con el href del enlace
  });
});
