import { writeFile } from 'node:fs/promises';
// Download only the Latin WOFF2 subset from Google Fonts, then serve it locally.
for (const [family,name] of [['Cormorant+Garamond:wght@300..700','cormorant'],['Manrope:wght@200..800','manrope']]) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}});
  if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
  const css = await response.text();
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m=>m[1]);
  const font = await fetch(urls.at(-1));
  if (!font.ok) throw new Error(`Font download: ${font.status}`);
  const data = Buffer.from(await font.arrayBuffer());
  if (data.subarray(0,4).toString() !== 'wOF2') throw new Error(`Expected WOFF2 font; received ${font.headers.get('content-type')} at ${urls.at(-1)}`);
  await writeFile(`src/assets/${name}.woff2`,data);
  console.log(`Saved ${name}.woff2 (${data.length} bytes)`);
}
for (const family of ['cormorantgaramond','manrope']) {
  const response=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if(!response.ok) throw new Error(`Font license: ${response.status}`);
  await writeFile(`src/assets/${family}-OFL.txt`,await response.text());
}
