const ORIGIN = 'https://gestpro-macchine-mobile.plepivincens.chatgpt.site';

const STYLE = `
<style id="vp-wallpaper-force">
html,body{min-height:100%!important;background:#061735 url('/api/wallpaper?v=4') center top/cover no-repeat fixed!important}
body{background-color:transparent!important}
.app-shell{background:rgba(4,18,39,.56)!important;backdrop-filter:blur(1px);-webkit-backdrop-filter:blur(1px)}
.login-page,.home-page,.detail-page{background:transparent!important}
.machine-card,.scan-analysis,.verify-card,.login-card,.section-card{background:rgba(8,28,52,.78)!important;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}
@media(max-width:720px){html,body{background-attachment:scroll!important;background-position:center top!important}.app-shell{background:rgba(4,18,39,.50)!important}}
</style>`;

module.exports = async function handler(req,res){
  try{
    const upstream = await fetch(ORIGIN + '/', {headers:{'user-agent':'GestPro-Vercel-Page-Proxy/1.0'}});
    if(!upstream.ok) return res.status(upstream.status).send('Upstream page error');
    let html = await upstream.text();
    html = html.includes('</head>') ? html.replace('</head>', STYLE + '</head>') : STYLE + html;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','no-store, max-age=0');
    res.status(200).send(html);
  }catch(e){
    res.status(500).send('GestPro page proxy error: ' + (e?.message || e));
  }
};
