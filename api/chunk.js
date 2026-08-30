const ORIGIN = 'https://gestpro-macchine-mobile.plepivincens.chatgpt.site';
const CHUNK = '/_next/static/chunks/page-BC2UGiUq.js';

const NEW_ID_SCANNER = 'async function Si(e,t){t(8,`Raddrizzamento automatico del foglio`);let n=await xi(e),r=document.createElement(`canvas`),i=Math.round(n.width*.74),a=Math.round(n.height*.025),o=Math.round(n.width*.23),s=Math.round(n.height*.065),c=4;r.width=o*c,r.height=s*c;let l=r.getContext(`2d`,{willReadFrequently:!0});if(!l)throw Error(`Lettura ID non disponibile`);l.imageSmoothingEnabled=!0,l.drawImage(n,i,a,o,s,0,0,r.width,r.height);let u=l.getImageData(0,0,r.width,r.height),d=u.data;for(let e=0;e<d.length;e+=4){let t=d[e]*.299+d[e+1]*.587+d[e+2]*.114,n=t>142?0:255;d[e]=d[e+1]=d[e+2]=n,d[e+3]=255}l.putImageData(u,0,0);let f=await(0,oi.createWorker)(`eng`,1,{logger:e=>{e&&e.status===`recognizing text`&&t(15+Math.round((e.progress||0)*65),`Lettura ID macchina`)}});try{await f.setParameters({tessedit_char_whitelist:`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`,tessedit_pageseg_mode:`7`});let q=await f.recognize(r),raw=(q.data.text||``).toUpperCase().replace(/\\s+/g,` `).trim(),nums=raw.match(/\\d{2,8}/g)||[],id=nums.sort((e,t)=>t.length-e.length)[0]||``,out=id?`ID ${id} ${raw}`:raw;return si.set(e,{text:out,canvas:n}),out}finally{await f.terminate()}}';

const NEW_CHECKBOX_SCANNER = 'function Oi(e,t,n){let r=e.getContext(`2d`,{willReadFrequently:!0});if(!r)return[];let i=r.getImageData(0,0,e.width,e.height).data,a=(t,n)=>{t=Math.max(0,Math.min(e.width-1,Math.round(t))),n=Math.max(0,Math.min(e.height-1,Math.round(n)));let r=(n*e.width+t)*4;return i[r]*.299+i[r+1]*.587+i[r+2]*.114},o=(e,t,n,r)=>{let i=[];for(let o=t-r;o<=t+r;o++)for(let s=e-r;s<=e+r;s++)n(s-e,o-t)&&i.push(a(s,o));return i},s=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:255,c=e=>{if(!e.length)return 0;let t=s(e);return Math.sqrt(e.reduce((e,n)=>e+(n-t)**2,0)/e.length)},l=(e,t)=>{let n={x:e,y:t,size:9,score:-1};for(let r=-16;r<=16;r+=2)for(let i=-26;i<=26;i+=2)for(let o=7;o<=13;o+=2){let s=0,c=0;for(let n=-o+2;n<=o-2;n+=2)s+=255-a(e+i-o,t+r+n),s+=255-a(e+i+o,t+r+n),s+=255-a(e+i+n,t+r-o),s+=255-a(e+i+n,t+r+o),c+=4;s/=c,s>n.score&&(n={x:e+i,y:t+r,size:o,score:s})}return n},u=(e,t)=>{let n=l(e,t),r=Math.max(4,Math.round(n.size*.58)),i=Math.max(r+5,Math.round(n.size*1.65)),u=o(n.x,n.y,(e,t)=>Math.max(Math.abs(e),Math.abs(t))<=r,r),d=o(n.x,n.y,(e,t)=>{let n=Math.max(Math.abs(e),Math.abs(t));return n>=r+4&&n<=i},i),f=s(d),p=Math.max(72,Math.min(218,f-38)),m=u.filter(e=>e<p).length/Math.max(1,u.length),h=u.filter(e=>e<Math.max(55,f-72)).length/Math.max(1,u.length),g=s(u),_=c(u),v=Math.max(0,f-g),y=260*m+180*h+.32*_+.28*v,b=m>.03&&(h>.008||_>16||v>8)&&y>=18,x=Math.max(62,Math.min(99,Math.round(b?68+Math.min(31,(y-18)*1.15):68+Math.min(31,(18-y)*1.3))));return{value:b,confidence:x,score:y,x:n.x,y:n.y,size:n.size}},d=.239,f=.0231,p=d+t*f+.046;return[...Array.from({length:t},(e,t)=>d+t*f),...Array.from({length:n},(e,t)=>p+t*f)].map(t=>{let n=u(.752*e.width,t*e.height),r=u(.89*e.width,t*e.height);return{inStock:n.value,installed:r.value,confidence:Math.min(n.confidence,r.confidence)}})}';

module.exports = async function handler(req, res) {
  try {
    const upstream = await fetch(`${ORIGIN}${CHUNK}`, {
      headers: { 'user-agent': 'GestPro-Vercel-Scanner-Proxy/1.0' }
    });
    if (!upstream.ok) {
      res.status(upstream.status).send(`Upstream chunk error: ${upstream.status}`);
      return;
    }

    let js = await upstream.text();
    const original = js;

    js = js.replace(/async function Si\(e,t\)\{[\s\S]*?(?=function Ci\()/, NEW_ID_SCANNER);
    js = js.replace(/function Oi\(e,t,n\)\{[\s\S]*?(?=async function ki\()/, NEW_CHECKBOX_SCANNER);

    if (js === original || !js.includes('n.width*.74') || !js.includes('260*m+180*h')) {
      res.status(500).send('GestPro scanner patch markers not found in upstream bundle.');
      return;
    }

    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('X-GestPro-Scanner', 'v3-id-robust-checkboxes');
    res.status(200).send(js);
  } catch (error) {
    res.status(500).send(`GestPro scanner proxy error: ${error?.message || error}`);
  }
};
