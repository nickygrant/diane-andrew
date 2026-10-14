// Run after deployment: only submit URLs inside this project's verified path.
const site = (process.env.SITE_URL || '').replace(/\/$/, '');
const key = (process.env.INDEXNOW_KEY || '').trim();
if (!site.startsWith('https://') || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('SITE_URL and INDEXNOW_KEY are required');
const keyLocation = `${site}/${key}.txt`;
const verification = await fetch(keyLocation);
if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('The live IndexNow key file is not ready');
const sitemap = await fetch(`${site}/sitemap.xml`);
if (!sitemap.ok) throw new Error('Live sitemap unavailable');
const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replaceAll('&amp;', '&'));
if (!urls.length || urls.some(url=>!url.startsWith(site+'/'))) throw new Error('Sitemap URLs must belong to this project');
const response = await fetch('https://api.indexnow.org/indexnow', {
  method:'POST', headers:{'Content-Type':'application/json'},
  body:JSON.stringify({host:new URL(site).hostname, key, keyLocation, urlList:urls})
});
if (![200,202].includes(response.status)) throw new Error(`IndexNow submission failed: HTTP ${response.status} ${(await response.text()).slice(0,250)}`);
console.log(`IndexNow: submitted ${urls.length} public URLs; HTTP ${response.status}${response.status===202?' (key validation pending)':''}. This is a crawl notification, not confirmation of indexing.`);
