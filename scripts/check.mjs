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
const contact=await readFile(path.join(root,'contact/index.html'),'utf8');
const email=process.env.CONTACT_EMAIL || 'Dianelumley9@gmail.com';
assert(contact.includes('data-email="'+email+'"'),'Enquiry form must be connected to Diane email');
assert(contact.includes('mailto:'+email),'Direct email contact link is missing');
assert(contact.includes('method="POST"'),'Enquiry form must use POST');
assert(contact.includes('action="https://formsubmit.co/'+email+'"'),'FormSubmit delivery destination must match Diane email');
assert(contact.includes('name="_honey"'),'Honeypot protection must be enabled');
assert(contact.includes('name="privacy_acknowledgement"') && contact.includes('required'),'Consent acknowledgement required');
assert(contact.includes('enquiry-received/'),'Post-submit destination missing');
const privacy=await readFile(path.join(root,'privacy/index.html'),'utf8');
assert(privacy.includes('FormSubmit'),'Contact form processor must be disclosed');
const thanks=await readFile(path.join(root,'enquiry-received/index.html'),'utf8');
assert(thanks.includes('has been submitted'),'Submission acknowledgment missing');
for(const guide of ['reiki-roots','after-reiki','reading-or-reiki']){
  const html=await readFile(path.join(root,'journal',guide,'index.html'),'utf8');
  assert(html.includes('<article class="article-main">'),`Original journal guide missing: ${guide}`);
}
const about=await readFile(path.join(root,'about/index.html'),'utf8');
assert(about.includes('certificate-high-resolution') || about.includes('certificate-sheet-img'),'Training certificates absent');
const css=await readFile(path.join(root,'site.css'),'utf8');
for(const m of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g))await stat(path.resolve(root,m[1]));
console.log(`PASS: ${titles.size} pages, ${checked} local references, unique titles, one H1 per page, valid JSON-LD, font assets, verified Reiki session prices, Diane's form delivery address, consent, privacy disclosure and journal guides.`);
