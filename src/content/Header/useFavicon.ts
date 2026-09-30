import { useEffect, useState } from 'react';

const favicons = [
  "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌎</text></svg>'),
  "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌍</text></svg>'),
  "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌏</text></svg>')
];

export default function useFavicon() {
  const [faviconIdx, setFaviconIdx] = useState(0);
  
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (favicon) {
      favicon.href = favicons[faviconIdx];
    }

    const interval = setInterval(() => {
      setFaviconIdx((prev) => (prev + 1) % 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [faviconIdx]);
}
