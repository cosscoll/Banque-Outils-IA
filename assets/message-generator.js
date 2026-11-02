/* Banque Outils IA. Composition de textes locale sans réseau, IA, stockage ou suivi. */
(()=>{
  'use strict';
  const form=document.getElementById('messageForm');
  if(!form)return;
  const output=document.getElementById('messageOutput');
  const status=document.getElementById('messageStatus');
  const copy=document.getElementById('copyMessage');
  const save=document.getElementById('saveMessage');
  const value=id=>document.getElementById(id).value.trim().replace(/\s+/g,' ');
  const clean=s=>s.replace(/[.!?;,\s]+$/g,'');
  const sentence=s=>clean(s)+'.';
  const lowerFirst=s=>s.charAt(0).toLowerCase()+s.slice(1);
  function build(v){
    if(v.channel==='email'){
      const intro=v.tone==='direct'?'Voici notre proposition : ':v.tone==='warm'?'Nous sommes heureux de vous présenter ':'Nous souhaitons vous présenter ';
      return [
        'Objet : '+clean(v.benefit)+' — '+v.business,'',
        v.tone==='warm'?'Bonjour à toutes et à tous,':'Bonjour,','',
        intro+sentence(v.offer)+' Cette proposition s’adresse à '+sentence(v.audience),
        'Notre objectif est de '+sentence(lowerFirst(v.benefit)),'',
        sentence(v.cta),'',
        v.tone==='warm'?'Au plaisir d’échanger,':'Bien cordialement,',
        v.business
      ].join('\n');
    }
    if(v.channel==='post'){
      const hook=v.tone==='direct'?'Un besoin concret : ':v.tone==='warm'?'Et si vous pouviez ':'Envie de ';
      return [
        hook+clean(lowerFirst(v.benefit))+' ?','',
        v.business+' propose '+v.offer+' pour '+sentence(v.audience),
        'Notre objectif : '+sentence(lowerFirst(v.benefit)),'',
        sentence(v.cta)
      ].join('\n');
    }
    return [
      clean(v.benefit),'',
      v.business+' propose '+v.offer+' pour '+sentence(v.audience),
      'Notre objectif : '+sentence(lowerFirst(v.benefit)),'',
      sentence(v.cta)
    ].join('\n');
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const values={business:value('business'),audience:value('audience'),offer:value('offer'),benefit:value('benefit'),cta:value('cta'),channel:value('channel'),tone:value('tone')};
    if(Object.values(values).some(x=>!x)){status.textContent='Complétez les champs requis.';return;}
    output.value=build(values);
    copy.disabled=false;save.disabled=false;
    status.textContent='Brouillon créé sur votre appareil. Vérifiez-le avant utilisation.';
  });
  copy.addEventListener('click',async()=>{
    if(!output.value)return;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      try{await navigator.clipboard.writeText(output.value);status.textContent='Texte copié.';return;}catch(error){/* secours manuel */}
    }
    output.focus();output.select();
    status.textContent='Texte sélectionné : utilisez Ctrl+C ou Cmd+C pour le copier.';
  });
  save.addEventListener('click',()=>{
    if(!output.value)return;
    const blob=new Blob([output.value],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='banque-outils-ia-brouillon.txt';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent='Fichier texte préparé sur votre appareil.';
  });
  form.addEventListener('reset',()=>{
    output.value='';copy.disabled=true;save.disabled=true;
    status.textContent='Exemple restauré.';
  });
})();
