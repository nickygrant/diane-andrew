import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source = await readFile('src/analytics.js','utf8');
function scenario(stored) {
  const appended=[], events={}, calls=[];
  const storage = new Map(stored ? [['diane-analytics-consent-v1',JSON.stringify(stored)]] : []);
  const banner = {hidden:true,querySelector:()=>({focus(){}})};
  const window = {};
  const document = {
    currentScript:{src:'https://example.com/diane-andrew/analytics.js',dataset:{measurementId:'G-TEST1234'}},
    title:'Test page',cookie:'diane_ga=abc',
    querySelector(selector){return selector==='#cookie-notice'?banner:{href:'https://example.com/diane-andrew/contact/'};},
    querySelectorAll(selector){return selector==='[data-consent]'?['granted','denied'].map(choice=>({dataset:{consent:choice},addEventListener(_,handler){events[choice]=handler;}})):[{addEventListener(_,handler){events.settings=handler;}}];},
    createElement:()=>({}),head:{append:script=>appended.push(script)}
  };
  const location = {origin:'https://example.com',pathname:'/diane-andrew/contact/',hostname:'example.com',search:'?email=private@example.com',reload:()=>calls.push('reload')};
  vm.runInNewContext(source,{document,window,location,URL,Date,JSON,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)}});
  return {appended,events,banner,window,calls,storage,document};
}
const fresh = scenario();
assert.equal(fresh.appended.length,0,'No Google requests before consent');
assert.equal(fresh.banner.hidden,false);
fresh.events.denied();
assert.equal(fresh.appended.length,0,'Declining must not load Google');
fresh.events.settings();
assert.equal(fresh.banner.hidden,false);
fresh.events.granted();
assert.equal(fresh.appended.length,1);
assert.equal(fresh.window['ga-disable-G-TEST1234'],false,'Allow after declining must work');
const payload=JSON.stringify(fresh.window.dataLayer.map(args=>Array.from(args)));
assert(!payload.includes('private@example.com') && !payload.includes('?email='),'Analytics must not contain enquiry URL parameters');
fresh.events.granted();
assert.equal(fresh.appended.length,1,'Repeated choice must not duplicate the tag');
fresh.events.denied();
assert.equal(fresh.window['ga-disable-G-TEST1234'],true);
assert.deepEqual(fresh.calls,['reload'],'Withdrawal removes the loaded tag by reloading');
assert(fresh.document.cookie.includes('Max-Age=0'),'Withdrawal clears project analytics cookies');
assert.equal(scenario({choice:'denied',time:Date.now()}).appended.length,0);
assert.equal(scenario({choice:'granted',time:Date.now()}).appended.length,1);
assert.equal(scenario({choice:'granted',time:0}).appended.length,0,'Expired consent needs a fresh choice');
console.log('PASS: Analytics stays off until consent, remembered choices and expiry work, URL parameters are excluded, withdrawal disables tracking. No network requests were sent.');
