import assert from 'node:assert/strict';
import { readFile,readdir,stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,e.name);result.push(...e.isDirectory()?await walk(full):[full]);}return result;}
const files=await walk(root);
const titles=new Set();
let checked=0;
for(const file of files.filter(f=>f.endsWith('.html'))){
  const html=await readFile(file,'utf8');
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title,'Missing title');assert(!titles.has(title),'Duplicate title');titles.add(title);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: must have one h1`);
  assert(html.includes('<html lang="en-GB">'),'Language missing');
  assert(html.includes('name="description"'),'Description missing');
  if(file.endsWith('/reiki-healing/index.html')) assert(html.includes('£30') && html.includes('£60') && html.includes('£75'),'Reiki rates missing');
  for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(match[1]);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const url=match[1].split('?')[0].split('#')[0];
    if(!url||/^(https?:|mailto:|data:)/.test(url))continue;
    let target=path.resolve(path.dirname(file),decodeURIComponent(url));
    const info=await stat(target).catch(()=>null);
    assert(info,`${file}: missing linked file ${url}`);
    if(info.isDirectory())await stat(path.join(target,'index.html'));
    checked++;
  }
}
const css=await readFile(path.join(root,'site.css'),'utf8');
for(const m of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g))await stat(path.resolve(root,m[1]));
console.log(`PASS: ${titles.size} pages, ${checked} local references, unique titles, one H1 per page, valid JSON-LD, font assets, and verified Reiki session prices.`);
