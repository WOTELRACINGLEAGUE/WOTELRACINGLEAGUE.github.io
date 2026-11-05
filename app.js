
function syncBroadcast(page){
 const host=document.getElementById('broadcast-player');
 if(!host)return;
 if(page!=='broadcast'){host.replaceChildren();return;}
 if(host.querySelector('iframe'))return;
 const frame=document.createElement('iframe');
 frame.title='Ultimate Dirt TV live broadcast';
 frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
 frame.allowFullscreen=true;
 frame.referrerPolicy='strict-origin-when-cross-origin';
 frame.src='https://www.youtube.com/embed/live_stream?channel=UCaBgGzDO_D4LyyGMH7pwBVQ&autoplay=1&mute=1&playsinline=1';
 host.append(frame);
 document.getElementById('broadcast-status').textContent='Channel live player · Availability is shown in the YouTube player below.';
}
function route(){const id=location.hash.slice(1)||'main';const valid=['main','results','standings','schedule','broadcast','past-races','join'].includes(id)?id:'main';document.querySelectorAll('.page').forEach(p=>p.hidden=p.id!==valid);document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+valid)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});document.title=({main:'Home',results:'Race Results',standings:'Points Standings',schedule:'Season 33 Schedule',broadcast:'Live Broadcast','past-races':'Past WOTEL Races',join:'How to Join WOTEL'})[valid]+' | WOTEL';syncBroadcast(valid);window.scrollTo(0,0)}window.addEventListener('hashchange',route);document.getElementById('year').textContent=new Date().getFullYear();route();

const divisionPicker=document.getElementById('result-division');divisionPicker.addEventListener('change',()=>{document.querySelectorAll('.division-results').forEach(section=>section.hidden=section.id!==divisionPicker.value)});

for(const [id,cls] of [["points-division","points-division"],["schedule-division","schedule-division"]]){const select=document.getElementById(id);select.addEventListener("change",()=>document.querySelectorAll("."+cls).forEach(el=>el.hidden=el.dataset.division!==select.value));}

document.getElementById('refresh-broadcast').addEventListener('click',()=>{
 document.getElementById('broadcast-player').replaceChildren();
 syncBroadcast('broadcast');
});

document.querySelectorAll('[data-race-results]').forEach(link=>link.addEventListener('click',()=>{divisionPicker.value=link.dataset.raceResults;divisionPicker.dispatchEvent(new Event('change'));}));
