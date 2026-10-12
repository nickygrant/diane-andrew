const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click();
    menu.focus();
  }
});

// Keep the service chosen on a service page when opening the contact form.
// The HTML form submits directly to FormSubmit, so no JavaScript email app is required.
const form = document.querySelector('#enquiry-form');
if (form) {
  const service = new URLSearchParams(location.search).get('service');
  if (['Psychic reading', 'Reiki healing'].includes(service)) {
    form.elements.service.value = service;
  }
}
