import './style.css'

const favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
if (favicon) {
  let idx = 1;
  setInterval(() => {
    favicon.href = '/public/favicon' + idx + '.svg';
    idx = (idx + 1) % 3;
  }, 1000)
}