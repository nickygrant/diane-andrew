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

const form = document.querySelector('#enquiry-form');
if (form) {
  const service = new URLSearchParams(location.search).get('service');
  if (['Psychic reading', 'Reiki healing'].includes(service)) form.elements.service.value = service;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `${data.get('service')} enquiry`;
    const message = `Hello Diane,\n\nI'd like to enquire about ${String(data.get('service')).toLowerCase()}.\nPreferred session: ${data.get('format')}\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
    document.querySelector('#enquiry-text').textContent = message;
    const result = document.querySelector('#enquiry-result');
    result.hidden = false;
    const email = form.dataset.email;
    const emailLink = document.querySelector('#email-enquiry');
    if (email) {
      emailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      emailLink.hidden = false;
    }
    result.querySelector('h3').focus();
  });
  document.querySelector('#copy-enquiry')?.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(document.querySelector('#enquiry-text').textContent);
      status.textContent = 'Copied. Your enquiry has not been sent.';
    } catch {
      status.textContent = 'Please select and copy the enquiry text above. It has not been sent.';
    }
  });
}
