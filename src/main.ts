import './style.css'

const favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
if (favicon) {
  let idx = 1;
  setInterval(() => {
    favicon.href = '/favicon' + idx + '.svg';
    idx = (idx + 1) % 3;
  }, 1000)
}

const collapsibleSections = document.querySelectorAll<HTMLElement>('.collapsible')
const collapseHandler = (section: HTMLElement, content: HTMLElement) => {
  section.classList.toggle('collapsible-collapsed');
  content.classList.toggle('visually-hidden');
}
collapsibleSections.forEach(section => {
  const content = section.querySelector<HTMLElement>('.collapsible-content');
  section.querySelectorAll<HTMLElement>('.collapsible-btn').forEach(btn => {
    btn.addEventListener('click', () => collapseHandler(section, content));
  });
});
