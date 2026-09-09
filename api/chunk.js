const ORIGIN = 'https://gestpro-macchine-mobile.plepivincens.chatgpt.site';
const FALLBACK_CHUNK = '/_next/static/chunks/scanner-client-BNDCUlFn.js';
const RELEASE = '14';

// The generic document fallback can mistake the entire iPhone photograph for
// the sheet when the white paper touches a light laptop background. The two
// dark printed bands are stable template anchors and span enough vertical
// distance to recover the real page perspective.
const ROBUST_PAGE_ALIGNER = "async function xi(e){let t=await vi(),n=await yi(e),r=t.imread(n),i=new t.Mat;r.cols>r.rows?t.rotate(r,i,t.ROTATE_90_COUNTERCLOCKWISE):r.copyTo(i);let a=new t.Mat,o=new t.Mat,s=new t.Mat,c=new t.MatVector,l=new t.Mat,u=new t.Mat,d=new t.MatVector,f=new t.Mat,p=t.getStructuringElement(t.MORPH_RECT,new t.Size(19,19));t.cvtColor(i,a,t.COLOR_RGBA2GRAY),t.GaussianBlur(a,o,new t.Size(5,5),0),t.Canny(o,s,45,135),t.findContours(s,c,l,t.RETR_LIST,t.CHAIN_APPROX_SIMPLE);let m=null,h=0;for(let e=0;e<c.size();e++){let n=c.get(e),r=t.arcLength(n,!0),a=new t.Mat;t.approxPolyDP(n,a,r*.02,!0);let o=Math.abs(t.contourArea(a));a.rows===4&&o>h&&o>i.rows*i.cols*.08&&(m&&m.delete(),m=a.clone(),h=o),a.delete(),n.delete()}let VPtemplateBands=!0,q=new t.Mat,g=new t.MatVector,_=new t.Mat,v=t.getStructuringElement(t.MORPH_RECT,new t.Size(Math.max(61,Math.round(i.cols*.075)),3)),y=null,b=null,x=0,S=0;t.threshold(a,q,125,255,t.THRESH_BINARY_INV),t.morphologyEx(q,q,t.MORPH_OPEN,v),t.findContours(q,g,_,t.RETR_EXTERNAL,t.CHAIN_APPROX_SIMPLE);for(let e=0;e<g.size();e++){let n=g.get(e),r=t.boundingRect(n),a=t.RotatedRect.points(t.minAreaRect(n)).flatMap(e=>[e.x,e.y]);r.y>i.rows*.025&&r.y<i.rows*.16&&r.width>i.cols*.55&&r.width>r.height*6&&r.width>x&&(y=a,x=r.width),r.y>i.rows*.15&&r.y<i.rows*.34&&r.width>i.cols*.55&&r.width>r.height*10&&r.width>S&&(b=a,S=r.width),n.delete()}if(y&&b){let e=bi(y),n=bi(b),a=t.matFromArray(8,1,t.CV_32FC2,[...e.flatMap(e=>[e.x,e.y]),...n.flatMap(e=>[e.x,e.y])]),o=t.matFromArray(8,1,t.CV_32FC2,[.0442*ci,.0314*li,.956*ci,.0314*li,.956*ci,.0764*li,.0442*ci,.0764*li,.0442*ci,.2084*li,.956*ci,.2084*li,.956*ci,.229*li,.0442*ci,.229*li]),s=t.findHomography(a,o,0),c=new t.Mat;t.warpPerspective(i,c,s,new t.Size(ci,li),t.INTER_LINEAR,t.BORDER_CONSTANT,new t.Scalar(255,255,255,255));let h=document.createElement(`canvas`);return h.width=ci,h.height=li,t.imshow(h,c),r.delete(),i.delete(),a.delete(),o.delete(),s.delete(),c.delete(),q.delete(),g.delete(),_.delete(),v.delete(),m&&m.delete(),l.delete(),u.delete(),d.delete(),f.delete(),p.delete(),h}q.delete(),g.delete(),_.delete(),v.delete(),t.threshold(a,u,75,255,t.THRESH_BINARY),t.morphologyEx(u,u,t.MORPH_CLOSE,p),t.findContours(u,d,f,t.RETR_EXTERNAL,t.CHAIN_APPROX_SIMPLE);let C=null,w=0;for(let e=0;e<d.size();e++){let n=d.get(e),r=Math.abs(t.contourArea(n));r>w&&(C&&C.delete(),C=n.clone(),w=r),n.delete()}if(!m&&(!C||w<i.rows*i.cols*.25))throw r.delete(),i.delete(),a.delete(),o.delete(),s.delete(),c.delete(),l.delete(),u.delete(),d.delete(),f.delete(),p.delete(),C&&C.delete(),Error(`Inquadra tutto il foglio, compresi i quattro angoli`);let T=bi(m?Array.from(m.data32S):t.RotatedRect.points(t.minAreaRect(C)).flatMap(e=>[e.x,e.y])),E=t.matFromArray(4,1,t.CV_32FC2,T.flatMap(e=>[e.x,e.y])),D=t.matFromArray(4,1,t.CV_32FC2,[0,0,ci-1,0,ci-1,li-1,0,li-1]),O=t.getPerspectiveTransform(E,D),k=new t.Mat;t.warpPerspective(i,k,O,new t.Size(ci,li),t.INTER_LINEAR,t.BORDER_CONSTANT,new t.Scalar(255,255,255,255));let A=document.createElement(`canvas`);return A.width=ci,A.height=li,t.imshow(A,k),r.delete(),i.delete(),a.delete(),o.delete(),s.delete(),c.delete(),l.delete(),u.delete(),d.delete(),f.delete(),p.delete(),C&&C.delete(),m&&m.delete(),E.delete(),D.delete(),O.delete(),k.delete(),A}";

const NEW_ID_SCANNER = "async function Si(e,t){t(8,`Raddrizzamento automatico del foglio`);let n=await xi(e),r=document.createElement(`canvas`),i=Math.round(n.width*.74),a=Math.round(n.height*.025),o=Math.round(n.width*.23),s=Math.round(n.height*.065),c=4;r.width=o*c,r.height=s*c;let l=r.getContext(`2d`,{willReadFrequently:!0});if(!l)throw Error(`Lettura ID non disponibile`);l.imageSmoothingEnabled=!0,l.drawImage(n,i,a,o,s,0,0,r.width,r.height);let u=l.getImageData(0,0,r.width,r.height),d=u.data;for(let e=0;e<d.length;e+=4){let t=d[e]*.299+d[e+1]*.587+d[e+2]*.114,n=t>142?0:255;d[e]=d[e+1]=d[e+2]=n,d[e+3]=255}l.putImageData(u,0,0);let f=await(0,oi.createWorker)(`eng`,1,{logger:e=>{e&&e.status===`recognizing text`&&t(15+Math.round((e.progress||0)*65),`Lettura ID macchina`)}});try{await f.setParameters({tessedit_char_whitelist:`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`,tessedit_pageseg_mode:`7`});let q=await f.recognize(r),raw=(q.data.text||``).toUpperCase().replace(/\\s+/g,` `).trim(),nums=raw.match(/\\d{2,8}/g)||[],id=nums.sort((e,t)=>t.length-e.length)[0]||``,out=id?`ID ${id} ${raw}`:raw;return si.set(e,{text:out,canvas:n}),out}finally{await f.terminate()}}";
const NEW_CHECKBOX_SCANNER = "function Oi(e,t,n){let r=e.getContext(`2d`,{willReadFrequently:!0});if(!r)return[];let i=r.getImageData(0,0,e.width,e.height).data,a=(t,n)=>{t=Math.max(0,Math.min(e.width-1,Math.round(t))),n=Math.max(0,Math.min(e.height-1,Math.round(n)));let r=(n*e.width+t)*4;return i[r]*.299+i[r+1]*.587+i[r+2]*.114},o=(e,t,n,r)=>{let i=[];for(let o=t-r;o<=t+r;o++)for(let s=e-r;s<=e+r;s++)n(s-e,o-t)&&i.push(a(s,o));return i},s=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:255,c=e=>{if(!e.length)return 0;let t=s(e);return Math.sqrt(e.reduce((e,n)=>e+(n-t)**2,0)/e.length)},l=(e,t)=>{let n={x:e,y:t,size:9,score:-1};for(let r=-16;r<=16;r+=2)for(let i=-26;i<=26;i+=2)for(let o=7;o<=13;o+=2){let s=0,c=0;for(let n=-o+2;n<=o-2;n+=2)s+=255-a(e+i-o,t+r+n),s+=255-a(e+i+o,t+r+n),s+=255-a(e+i+n,t+r-o),s+=255-a(e+i+n,t+r+o),c+=4;s/=c,s>n.score&&(n={x:e+i,y:t+r,size:o,score:s})}return n},u=(e,t)=>{let n=l(e,t),r=Math.max(4,Math.round(n.size*.58)),i=Math.max(r+5,Math.round(n.size*1.65)),u=o(n.x,n.y,(e,t)=>Math.max(Math.abs(e),Math.abs(t))<=r,r),d=o(n.x,n.y,(e,t)=>{let n=Math.max(Math.abs(e),Math.abs(t));return n>=r+4&&n<=i},i),f=s(d),p=Math.max(72,Math.min(218,f-38)),m=u.filter(e=>e<p).length/Math.max(1,u.length),h=u.filter(e=>e<Math.max(55,f-72)).length/Math.max(1,u.length),g=s(u),_=c(u),v=Math.max(0,f-g),y=260*m+180*h+.32*_+.28*v,b=m>.03&&(h>.008||_>16||v>8)&&y>=18,x=Math.max(62,Math.min(99,Math.round(b?68+Math.min(31,(y-18)*1.15):68+Math.min(31,(18-y)*1.3))));return{value:b,confidence:x,score:y,border:n.score,x:n.x,y:n.y,size:n.size}},d=.239,f=.0231,p=d+t*f+.046,m=Array.from({length:t},(n,r)=>{let i=d+r*f,a=u(.752*e.width,i*e.height),o=u(.89*e.width,i*e.height);return{start:a.value,end:o.value,confidence:Math.min(a.confidence,o.confidence),detected:!0}}),h=[],g=0;for(let r=0;r<Math.max(n,10);r++){let i=p+r*f,a=u(.752*e.width,i*e.height),o=u(.89*e.width,i*e.height),s=Math.min(a.border,o.border)>108&&(a.border+o.border)/2>120;if(r<n||s)h.push({start:a.value,end:o.value,confidence:Math.min(a.confidence,o.confidence),detected:s}),g=0;else if(++g>=2&&r>=n)break}return[...m,...h]}";
const EXTRA_OCR = "async function VPextraOCR(e,t,n,r){if(!n)return[];r(90,`Lettura lavori fuori standard`);let i=.239+t*.0231+.046,a=.0231,o=await(0,oi.createWorker)(`eng`,1,{logger:()=>{}}),s=[];try{await o.setParameters({tessedit_pageseg_mode:`7`,preserve_interword_spaces:`1`});for(let t=0;t<n;t++){let n=(i+t*a)*e.height,c=Math.round(e.width*.075),l=Math.round(e.width*.58),u=Math.max(24,Math.round(e.height*.0205)),d=document.createElement(`canvas`),f=3;d.width=l*f,d.height=u*f;let p=d.getContext(`2d`);p&&(p.imageSmoothingEnabled=!0,p.filter=`grayscale(1) contrast(2.1)`,p.drawImage(e,c,Math.round(n-u/2),l,u,0,0,d.width,d.height));let m=(await o.recognize(d)).data.text||``,h=m.replace(/\\s+/g,` `).replace(/[|_[\\]{}]/g,``).trim().replace(/^[-.:]+|[-.:]+$/g,``).trim();s.push(h||`Lavoro fuori standard ${t+1}`)}return s}finally{await o.terminate()}}";
const CALIBRATED_CHECKBOX_SCANNER = NEW_CHECKBOX_SCANNER.replace('d=.239,f=.0231,p=d+t*f+.046', 'd=.2398,f=.02226,p=d+t*f+.0467');
const CALIBRATED_EXTRA_OCR = EXTRA_OCR.replace('i=.239+t*.0231+.046,a=.0231', 'i=.2398+t*.02226+.0467,a=.02226');
const ROW_SAFE_CHECKBOX_SCANNER = CALIBRATED_CHECKBOX_SCANNER
  // On the normalized page, adjacent rows are only about 22 px apart.
  // The previous +/-16 px vertical search could lock onto a checkbox in the
  // row above or below. Perspective correction already aligns the sheet, so
  // limiting the local search to +/-8 px keeps every tick on its own row.
  .replace('for(let r=-16;r<=16;r+=2)for(let i=-26;i<=26;i+=2)for(let o=7;o<=13;o+=2)', 'for(let r=-8;r<=8;r+=2)for(let i=-22;i<=22;i+=2)for(let o=7;o<=13;o+=2)');
const GRID_ALIGNED_CHECKBOX_SCANNER = ROW_SAFE_CHECKBOX_SCANNER
  // Use the first and last printed checkbox pairs as anchors. G and H are
  // new calibrated values; d and f stay untouched to avoid duplicate local
  // declarations in the generated minified browser bundle.
  .replace(
    'd=.2398,f=.02226,p=d+t*f+.0467,m=Array.from',
    'd=.2398,f=.02226,A=t>1?l(.752*e.width,d*e.height):null,B=t>1?l(.89*e.width,d*e.height):null,C=t>1?l(.752*e.width,(d+(t-1)*f)*e.height):null,D=t>1?l(.89*e.width,(d+(t-1)*f)*e.height):null,E=A&&B&&C&&D&&Math.min(A.score,B.score,C.score,D.score)>75,G=E?(A.y+B.y)/(2*e.height):d,H=E?((C.y+D.y)/(2*e.height)-G)/(t-1):f,p=G+t*H+.0467,m=Array.from'
  )
  .replace('let i=d+r*f,a=u(.752*e.width,i*e.height)', 'let i=G+r*H,a=u(.752*e.width,i*e.height)')
  .replace('let i=p+r*f,a=u(.752*e.width,i*e.height)', 'let i=p+r*H,a=u(.752*e.width,i*e.height)');
const COLOR_CHECKBOX_SCANNER = GRID_ALIGNED_CHECKBOX_SCANNER
  .replace('u=o(n.x,n.y,(e,t)=>Math.max(Math.abs(e),Math.abs(t))<=r,r),d=o(', 'u=o(n.x,n.y,(e,t)=>Math.max(Math.abs(e),Math.abs(t))<=r,r),R=(()=>{let A=0,B=0;for(let C=n.y-r;C<=n.y+r;C++)for(let D=n.x-r;D<=n.x+r;D++){let E=(Math.max(0,Math.min(e.height-1,C))*e.width+Math.max(0,Math.min(e.width-1,D)))*4,F=i[E],G=i[E+1],H=i[E+2];F>G*1.22&&F>H*1.22&&F-G>28&&(A++),B++}return A/Math.max(1,B)})(),d=o(')
  // Accept thin pen marks and faint red ticks, but still require real ink
  // contrast so an empty outlined square is not considered selected.
  .replace('b=m>.03&&(h>.008||_>16||v>8)&&y>=18', 'b=R>.018||m>.025&&(h>.006||_>14||v>7)&&y>=16');
const SAFE_EXTRA_OCR = CALIBRATED_EXTRA_OCR
  .replace('let m=(await o.recognize(d)).data.text||``', 'let q=(await o.recognize(d)).data,m=q.confidence>=72?q.text||``:``')
  .replace('s.push(h||`Lavoro fuori standard ${t+1}`)', 's.push(/[A-Za-zÀ-ÿ]{3}/.test(h)&&h.length<=60?h:``)');
const NEW_ANALYZE = "async function ki(e,t,n,r){let i=gi(t),a=si.get(e);if(!a){let t=r||await Si(e,n);a=si.get(e)||{text:t,canvas:await xi(e)}}n(85,`Lettura del nuovo foglio Inizio e Fine`);let o=hi(i),s=Oi(a.canvas,o.length,i.additionalWorks?.length||0),c=o.map(([e,t],n)=>{let r=i.components?.[e]||{start:!1,end:!1},a=s[n];return{key:e,label:t,found:!!a,confidence:a?.confidence??100,start:a?.start??!!r.start,end:a?.end??!!r.end}}),l=i.additionalWorks||[];for(let[e,t]of l.entries()){let n=s[o.length+e];c.push({key:t.id,label:t.label,found:!!n,confidence:n?.confidence??100,start:n?.start??!!t.start,end:n?.end??!!t.end,additional:!0})}let u=Math.max(0,s.length-o.length-l.length);if(u){let e=await VPextraOCR(a.canvas,o.length,u,n);for(let t=0;t<u;t++){let n=s[o.length+l.length+t],r=`auto_${Date.now().toString(36)}_${t+1}`;c.push({key:r,label:e[t]||`Lavoro fuori standard ${l.length+t+1}`,found:!!n,confidence:n?.confidence??90,start:!!n?.start,end:!!n?.end,additional:!0,autoDetected:!0===!1})}}return n(100,`Analisi completata`),{text:a.text,results:c}}";
const SAFE_ANALYZE = NEW_ANALYZE.replace('for(let t=0;t<u;t++){let n=s[o.length+l.length+t]', 'for(let t=0;t<u;t++){if(!e[t])continue;let n=s[o.length+l.length+t]');
const NO_AUTO_EXTRAS_ANALYZE = SAFE_ANALYZE.replace(/let u=Math\.max\(0,s\.length-o\.length-l\.length\);if\(u\)\{[\s\S]*?\}\}return n\(100,`Analisi completata`\)/, 'return n(100,`Analisi completata`)');
const SAVE_OLD = "if(e.additional){let t=n.findIndex(t=>t.id===e.key);t>=0&&(n[t]={...n[t],start:e.start,end:e.end})}else";
const SAVE_NEW = "if(e.additional){let t=n.findIndex(t=>t.id===e.key);t>=0?n[t]={...n[t],label:e.label||n[t].label,start:e.start,end:e.end}:n.push({id:e.key,label:e.label||`Lavoro fuori standard`,start:e.start,end:e.end})}else";

module.exports = async function handler(req, res) {
  try {
    const requested = String(req.query?.chunk || '').trim();
    const chunk = /^(?:page|scanner-client)-[A-Za-z0-9_-]+\.js$/.test(requested)
      ? `/_next/static/chunks/${requested}`
      : FALLBACK_CHUNK;
    const upstream = await fetch(`${ORIGIN}${chunk}`, { headers: { 'user-agent': 'GestPro-Vercel-Scanner-Proxy/1.2' } });
    if (!upstream.ok) return res.status(upstream.status).send(`Upstream chunk error: ${upstream.status}`);
    let js = await upstream.text();
    const original = js;
    const containsScanner = /async function Si\(e,t\)/.test(js) && /function Oi\(e,t,n\)/.test(js);
    if (!containsScanner) {
      // The page bundle loads the scanner with a relative dynamic import.
      // Version that URL too so Safari cannot reuse its previous scanner.
      js = js.replace(
        /(scanner-client-[A-Za-z0-9_-]+\.js)(?!\?vp=)/g,
        `$1?vp=${RELEASE}`
      );
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
      res.setHeader('X-GestPro-Scanner', 'v14-cache-busted');
      return res.status(200).send(js);
    }
    js = js.replace(/async function xi\(e\)\{[\s\S]*?(?=async function Si\()/, ROBUST_PAGE_ALIGNER);
    js = js.replace(/async function Si\(e,t\)\{[\s\S]*?(?=function Ci\()/, NEW_ID_SCANNER);
    js = js.replace(/function Oi\(e,t,n\)\{[\s\S]*?(?=async function ki\()/, COLOR_CHECKBOX_SCANNER + SAFE_EXTRA_OCR);
    js = js.replace(/async function ki\(e,t,n,r\)\{[\s\S]*?(?=var Ai=)/, NO_AUTO_EXTRAS_ANALYZE);
    js = js.replace(SAVE_OLD, SAVE_NEW);
    if (js === original || !js.includes('VPtemplateBands') || !js.includes('VPextraOCR') || !js.includes('Math.max(n,10)') || !js.includes('n.push({id:e.key') || !js.includes('start:a.value,end:o.value')) {
      return res.status(500).send('GestPro scanner patch markers not found in upstream bundle.');
    }
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('X-GestPro-Scanner', 'v14-cache-busted');
    return res.status(200).send(js);
  } catch (error) {
    return res.status(500).send(`GestPro scanner proxy error: ${error?.message || error}`);
  }
};
