/* Prépare un brouillon d'issue GitHub, sans collecter ni stocker de données. */
(()=>{
'use strict';
const form=document.getElementById('publicContactForm');
if(!form)return;
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const subject=document.getElementById('contactSubject').value.trim();
  const message=document.getElementById('contactMessage').value.trim();
  if(subject.length<5||message.length<15)return;
  const dest=new URL('https://github.com/cosscoll/Banque-Outils-IA/issues/new');
  dest.searchParams.set('title','[Contact Banque Outils IA] '+subject);
  dest.searchParams.set('body',message+'\n\n---\nDemande préparée depuis la page Contact du projet. Aucune information privée ne doit être publiée ici.');
  window.location.assign(dest.toString());
});
})();