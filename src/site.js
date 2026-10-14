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
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  if (['Psychic reading', 'Reiki healing'].includes(service)) {
    form.elements.service.value = service;
  }
  const duration = params.get('duration');
  if (service === 'Reiki healing' && ['30', '60', '90'].includes(duration)) {
    const message = `Hello Diane, I’m interested in a ${duration}-minute Reiki session. Please could you let me know your availability?`;
    if (!form.elements.message.value) form.elements.message.value = message;
    const whatsapp = document.querySelector('[data-booking-whatsapp]');
    if (whatsapp) whatsapp.href = 'https://wa.me/447756731671?text=' + encodeURIComponent(message);
    const email = document.querySelector('[data-booking-email]');
    if (email) email.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent('Reiki session enquiry') + '&body=' + encodeURIComponent(message);
  }
}
