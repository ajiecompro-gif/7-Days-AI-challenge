const CONFIG = {
 whatsappNumber: '2347026636301', eventDates: 'October 7 to 15, 2026',
 trainingOnly: {price:'₦9,999',label:'JOIN TRAINING ONLY',event:'training_only_whatsapp_click',message:"Hi Aji, I'm interested in joining the 7 Days AI Challenge Training Only package for ₦9,999. Please send me the details on how to get started."},
 premium: {price:'₦50,000',label:'GET TRAINING + PREMIUM TOOLS',event:'premium_tools_whatsapp_click',message:"Hi Aji, I'm interested in joining the 7 Days AI Challenge with 1 Year Premium AI Tools Access for ₦50,000. Please send me the details on how to get started."}
};
const createWhatsAppUrl = message => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
function track(event, details={}) {window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...details});window.dispatchEvent(new CustomEvent('acane:analytics',{detail:{event,...details}}));}
document.querySelectorAll('[data-package]').forEach(link=>{const key=link.dataset.package,pkg=CONFIG[key];link.textContent=pkg.label;link.href=createWhatsAppUrl(pkg.message);link.target='_blank';link.rel='noopener noreferrer';link.addEventListener('click',()=>track(pkg.event,{package:key}));});
document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)track('faq_open',{question:el.querySelector('summary').childNodes[0].textContent.trim()});}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){track('package_section_view');observer.disconnect();}},{threshold:.1});observer.observe(document.querySelector('#packages'));}
const RESULTS = [{"type": "image", "src": "proof-1.webp", "alt": "Channel analytics screenshot showing 14.9K views, 601 likes and 47 shares.", "caption": "Channel analytics"}, {"type": "image", "src": "proof-2.webp", "alt": "Video performance screenshot showing 1.2K views and 69.2% average viewed.", "caption": "Video performance"}, {"type": "image", "src": "proof-3.webp", "alt": "Google Flow video projects shared in a training conversation.", "caption": "Google Flow creations"}, {"type": "image", "src": "proof-4.webp", "alt": "A video project shared alongside guidance to create a longer video.", "caption": "Practice and guidance"}, {"type": "image", "src": "proof-5.webp", "alt": "A video and voice note shared during a training conversation.", "caption": "Video submission"}, {"type": "image", "src": "proof-6.webp", "alt": "Three video scenes shared during training.", "caption": "Storytelling projects"}, {"type": "image", "src": "proof-7.webp", "alt": "A 54 second video project shared with voice note feedback.", "caption": "Developing a full scene"}, {"type": "video", "src": "training-journey.mp4", "poster": "journey-poster.webp", "caption": "Training journey \u00b7 45 seconds", "description": "A screen recording from a training conversation. This clip has no audio."}, {"type": "video", "src": "project-walkthrough.mp4", "poster": "walkthrough-poster.webp", "caption": "Project walkthrough \u00b7 14 seconds", "description": "A screen recording of shared Google Flow creations."}];
const gallery=document.querySelector('#results-gallery');
const viewer=document.querySelector('#proof-viewer'),viewerImage=document.querySelector('#viewer-image'),viewerCaption=document.querySelector('#viewer-caption');
let previousFocus=null;
function closeViewer(){viewer.close();}
document.querySelector('#viewer-close').addEventListener('click',closeViewer);
viewer.addEventListener('click',event=>{if(event.target===viewer)closeViewer();});
viewer.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
RESULTS.forEach(item=>{
 const card=document.createElement('article');card.className='result-item '+(item.type==='video'?'proof-video':'proof-image');
 if(item.type==='video'){
 const video=document.createElement('video');video.controls=true;video.preload='none';video.playsInline=true;video.poster=item.poster;video.src=item.src;video.setAttribute('aria-label',item.caption);video.addEventListener('play',()=>{document.querySelectorAll('#results-gallery video').forEach(other=>{if(other!==video)other.pause();});});card.append(video);
 }else{
 const button=document.createElement('button');button.type='button';button.className='proof-open';button.setAttribute('aria-label','Enlarge '+item.caption);
 const image=document.createElement('img');image.src=item.src;image.alt=item.alt;image.loading='lazy';image.decoding='async';button.append(image);
 button.addEventListener('click',()=>{previousFocus=button;viewerImage.src=item.src;viewerImage.alt=item.alt;viewerCaption.textContent=item.caption;viewer.showModal();document.body.style.overflow='hidden';});card.append(button);
 }
 const caption=document.createElement('h3');caption.textContent=item.caption;card.append(caption);
 if(item.description){const desc=document.createElement('p');desc.textContent=item.description;card.append(desc);}
 gallery.append(card);
});
