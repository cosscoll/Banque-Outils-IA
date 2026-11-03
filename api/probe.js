/* Preview-only synthetic end-to-end probe. Never merge this route to main. */
'use strict';
const chat=require('./chat.js');
module.exports=async function(req,res){
 res.setHeader('Content-Type','application/json; charset=utf-8');
 res.setHeader('Cache-Control','no-store');
 if(process.env.VERCEL_ENV!=='preview'||req.method!=='GET'){res.statusCode=404;return res.end(JSON.stringify({error:'not_found'}));}
 const fakeReq={method:'POST',headers:{origin:'https://cosscoll.github.io','x-real-ip':'preview-probe-20261103'},
  body:{messages:[{role:'user',content:'Je suis boulanger et je souhaite présenter mon commerce sur Internet. Quelle banque choisir et pourquoi ?'}]}};
 let status=0,body='';
 const fakeRes={statusCode:200,setHeader(){},end(s){status=this.statusCode;body=s;}};
 await chat(fakeReq,fakeRes);
 let result={};
 try{result=JSON.parse(body||'{}');}catch{}
 res.statusCode=200;
 return res.end(JSON.stringify({modelResponseStatus:status,generated:status===200&&typeof result.reply==='string'&&result.reply.length>10,
  sample:typeof result.reply==='string'?result.reply.slice(0,450):'',productIds:(result.products||[]).map(p=>p.id),error:result.error||null}));
};
