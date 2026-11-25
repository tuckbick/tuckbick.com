# Performance baseline

Mobile performance of `https://tuckbick.com/`, recorded so that budgets and monitoring can start from real numbers.

| | |
|---|---|
| Date | 2026-11-25 (WebPageTest 05:11–05:17 UTC, Lighthouse 05:38–05:45 UTC) |
| Commit | [`cc0a575`](https://github.com/tuckbick/tuckbick.com/commit/cc0a575d9062d77be4aaf0ba75e1a22ff3949ee6) (deployed 2026-11-25 04:50 UTC; live assets `index-B4_VnkGM.js`, `index-DVOWw92_.css`) |
| Page | `https://tuckbick.com/`, first view (cold cache) |
| Tools | Lighthouse 13.6.0 (local CLI), WebPageTest (LogicMonitor, 3 locations) |

INP needs real user input, so lab tools can't measure it. TBT is recorded as the lab proxy.

## Baseline

KiB = 1,024 bytes. Lighthouse values are the median of 6 runs. WebPageTest values come from 1 run per location.

| Metric | Lighthouse (mobile, median) | WPT US | WPT Europe | WPT Asia |
|---|---|---|---|---|
| **LCP** | 1,721 ms | 501 ms | 583 ms | 736 ms |
| **TBT** | 68 ms | 0 ms | 37 ms | 5 ms |
| **CLS** | 0.0012 | 0 | 0.0035 | 0.0035 |
| **Total transfer size** | 1,272 KiB | 564 KiB | 861 KiB | 871 KiB |
| **JavaScript transfer size** | 85.4 KiB (2 files) | 84.8 KiB (2 files) | 74.8 KiB (1 file) | 84.8 KiB (2 files) |
| **Requests** | 17 | 11 | 11 | 13 |
| FCP | 1,721 ms | 501 ms | 583 ms | 736 ms |
| Speed Index | 1,947 ms | 500 ms | 606 ms | 703 ms |
| TTFB | 563 ms (throttled) | 101 ms | 178 ms | 245 ms |
| Fully loaded | — | 550 ms | 758 ms | 1,122 ms |
| Performance score | 99 | — | — | — |

Of the JavaScript, 75.2 KiB is the site's own bundle (`index-B4_VnkGM.js`). The rest is the Cloudflare Web Analytics beacon (about 10 KiB).

### Lighthouse runs

| Run | Fetch time (UTC) | Score | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) | Transfer (bytes) | JS (bytes) | Requests |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 05:38:23 | 97 | 1,917 | 140 | 0.0012 | 2,144 | 1,302,371 | 87,467 | 17 |
| 2 | 05:38:56 | 99 | 1,701 | 55 | 0.0012 | 1,927 | 1,302,411 | 87,500 | 17 |
| 3 | 05:39:29 | 99 | 1,684 | 78 | 0.0012 | 1,910 | 1,302,367 | 87,459 | 17 |
| 4 | 05:40:01 | 99 | 1,705 | 57 | 0.0012 | 1,931 | 1,302,414 | 87,505 | 17 |
| 5 | 05:40:34 | 99 | 1,737 | 56 | 0.0012 | 1,963 | 1,302,330 | 87,454 | 17 |
| 6 | 05:44:57 | 96 | 1,908 | 160 | 0.0012 | 2,135 | 1,302,376 | 87,477 | 17 |

With an even number of runs, the median is the mean of the two middle values, taken per metric.

Byte counts, request counts and CLS barely change between runs. TBT changes the most (55–160 ms here) because it depends on how busy the local machine is, so compare medians, not single runs. Earlier test sessions the same day gave TBT medians from 35 to 130 ms on the same commit.

## Tools and settings

### Lighthouse

- Lighthouse 13.6.0 from the CLI, run on a MacBook (macOS, headless Chrome 158) on a home connection, 6 runs in a row.
- Command:

  ```sh
  npx lighthouse@13.6.0 https://tuckbick.com --preset=perf --form-factor=mobile \
    --output=json --output=csv --output-path=./run-N --quiet --chrome-flags="--headless=new"
  ```

- What these settings mean in Lighthouse 13 (from the report's `configSettings`):
  - Emulated device: Moto G Power (2022), 412×823 viewport, DPR 1.75, mobile user agent.
  - Throttling method: `devtools`, with 150 ms RTT (562.5 ms request latency), 1,474.56 Kbps down / 675 Kbps up, and a 4× CPU slowdown. The steady 563 ms TTFB is this added latency, not server time.
  - CPU benchmark index of the machine: 1,326–1,378.

### WebPageTest

- [LogicMonitor WebPageTest](https://www.logicmonitor.com/webpagetest), **Mobile** test, connection **WiFi**, 1 run per location, first view only.
- Browser: Chrome 152, mobile viewport 393×657.

| Location | Test ID | Started (UTC) |
|---|---|---|
| US | `261125_instant_3a1b844dda5b495a813bfe2a603f60a7` | 05:11:37 |
| Europe | `261125_instant_564b672739dc49119828eced2abd3520` | 05:14:26 |
| Asia | `261125_instant_724cfaa7d2f24eda9d79bee2eb5d9e73` | 05:16:14 |

## Reading the numbers

- **Lighthouse is slower than WebPageTest on purpose.** Lighthouse simulates a slow 4G phone with a throttled CPU. WebPageTest used real WiFi. For budgets, use Lighthouse for timing metrics and either tool for byte counts.
- **Request counts and transfer sizes differ because gallery images are `loading="lazy"`.** Lighthouse fetched all 8 gallery images (about 1,106 KiB of JPEG), while WebPageTest fetched 2 (US) or 4 (Europe, Asia). Compare sizes from the same tool and location only.
- **Some requests are third-party:** Google Fonts (1 stylesheet and 3 `woff2` files, about 71 KiB) and the Cloudflare Web Analytics beacon and its `/cdn-cgi/rum` report. The beacon didn't load in the Europe WebPageTest run, which accounts for its 1 JS file. In Lighthouse, 5 requests (81.1 KiB) are third-party.
- **The LCP element is text** (a `<p>` in the intro), not an image, so LCP equals FCP in every run.

## Findings for the budget issue

From the same Lighthouse reports. These are not acted on here.

- Render-blocking requests: Lighthouse estimates 1,350–1,410 ms of savings (1,370 ms median). The Google Fonts stylesheet and the site CSS block the first render.
- Image delivery: Lighthouse estimates 1,045 KiB of savings, mostly from the gallery JPEGs.
- Legacy JavaScript: Lighthouse estimates 10 KiB of savings.
- Cache lifetime: Lighthouse estimates 4 KiB of savings.

## Budgets (Lighthouse CI)

Since 2026-11-25, every push to `main` and every pull request to `main` runs Lighthouse CI (`npm run lhci`, configured in `lighthouserc.json`) on the prerendered `dist/`. A failed budget fails the workflow and blocks the deploy.

How it runs: `@lhci/cli` 0.16.1, which bundles the same Lighthouse 13.6.0 as the baseline, with `preset: "perf"` and `formFactor: "mobile"` (Moto G Power emulation). It does 3 runs and checks the median run (`aggregationMethod: "median-run"`). Throttling is Lighthouse's default `simulate`, not the `devtools` throttling the baseline used, because it's steadier on shared CI runners. The page is served by Lighthouse CI's local static server, so the Cloudflare Web Analytics beacon and `_headers` aren't involved.

| Budget | Limit | Baseline (`cc0a575`) | Local, 2026-11-25 (median of 3) | Reasoning |
|---|---|---|---|---|
| Performance score (`categories:performance`) | ≥ 0.9 | 99 | 0.99 | Lighthouse's "good" band, with room for runner noise |
| LCP (`largest-contentful-paint`) | ≤ 2,500 ms | 1,721 ms | 1,552 ms | Core Web Vitals "good" limit |
| CLS (`cumulative-layout-shift`) | ≤ 0.05 | 0.0012 | 0 | Half the 0.1 "good" limit, so any real layout shift fails |
| TBT (`total-blocking-time`) | ≤ 200 ms | 68 ms | 31 ms | "Good" limit. Single runs went up to 160 ms in the baseline, so it isn't tighter |
| JavaScript transfer (`resource-summary:script:size`) | ≤ 100 KiB | 85.4 KiB (incl. ~10 KiB beacon) | 73.6 KiB (1 file) | About 35% headroom over the site's own bundle |
| Image transfer (`resource-summary:image:size`) | ≤ 100 KiB | ~1,106 KiB | 74.2 KiB (8 thumbnails) | About 35% over the current build. The baseline is far looser because it came before the 256px WebP thumbnails |
| Total transfer (`resource-summary:total:size`) | ≤ 300 KiB | 1,272 KiB | 235.6 KiB (15 requests) | About 27% over the current build. The baseline also included Google Fonts, which have since been self-hosted |

Byte budgets were set from the current build (about +25%, rounded up), not from the baseline, so the font and image work can't silently regress. Timing budgets use the Core Web Vitals "good" limits, which sit above both the baseline and the current build.

Verified on 2026-11-25: adding about 60 KiB of incompressible data to the JS bundle failed `resource-summary:script:size` (120,759 bytes found), and replacing one thumbnail with a 1.8 MB WebP failed the image and total budgets. Both exited with status 1.

### Changing a budget

1. Edit the value in `lighthouserc.json` under `ci.assert.assertions` (byte values are in bytes, timings in ms).
2. Run `npm run build && npm run lhci` to confirm the build passes. Reports land in `.lighthouseci/reports/`.
3. Update the table above with the new limit, the measured value, and why it changed.

In CI, reports for every run (pass or fail) are uploaded as the `lighthouse-reports-<attempt>` artifact on the workflow run. Expect to raise the image budget when adding a project with several new gallery images: each thumbnail is about 9 KiB.

## How to reproduce

1. Check which commit is live: `gh run list --workflow deploy.yml --limit 1` gives the deployed SHA, and `curl -s https://tuckbick.com/ | grep -oE 'index-[A-Za-z0-9_-]+\.(js|css)'` gives the live asset names to compare against the ones above.
2. Run Lighthouse 6 times, with no other heavy work running on the machine:

   ```sh
   for i in 1 2 3 4 5 6; do
     npx lighthouse@13.6.0 https://tuckbick.com --preset=perf --form-factor=mobile \
       --output=json --output=csv --output-path=./run-$i --quiet --chrome-flags="--headless=new"
   done
   ```

3. From each `run-N.report.json`, read:
   - LCP: `audits["largest-contentful-paint"].numericValue`
   - TBT: `audits["total-blocking-time"].numericValue`
   - CLS: `audits["cumulative-layout-shift"].numericValue`
   - FCP, Speed Index and TTFB: `audits["first-contentful-paint"]`, `audits["speed-index"]` and `audits["server-response-time"]`, each with `.numericValue`
   - Transfer size, JavaScript size and requests: `audits["resource-summary"].details.items`. The row with `resourceType` `"total"` gives the page totals, and the `"script"` row gives JavaScript (`transferSize`, `requestCount`).
   - Score: `categories.performance.score`

   Take the median of each metric across the 6 runs.
4. On [LogicMonitor WebPageTest](https://www.logicmonitor.com/webpagetest), run a **Mobile** test of `https://tuckbick.com` with connection **WiFi**, once each for **US**, **Europe** and **Asia**, and download the JSON result. From `data.runs["1"].firstView.steps[0]`, read:
   - Timing and layout: `LargestContentfulPaint`, `TotalBlockingTime`, `CumulativeLayoutShift`, `firstContentfulPaint`, `SpeedIndex`, `TTFB` and `fullyLoaded`
   - Total transfer: `bytesIn`
   - Requests: the length of `requests`
   - JavaScript: the sum of `requests[].size` where `req_type` is `"Script"`

   The JSON does not record the location, so note which test ID belongs to which location when you run it.
