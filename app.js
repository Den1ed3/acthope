const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('#navigation').classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus()}});
const form=document.querySelector('#enquiry-form');
if(form){
const params=new URLSearchParams(location.search), formats=['Online','Home','In-person'];
if(formats.includes(params.get('format')))form.querySelector(`input[value="${params.get('format')}"]`).checked=true;
if(['Initial','Therapy','Extended'].includes(params.get('type')))form.elements.session.value=params.get('type');
const suburb=document.querySelector('#suburb-field');
function updateFormat(){suburb.hidden=form.elements.format.value==='Online';suburb.querySelector('input').required=form.elements.format.value!=='Online'}
form.querySelectorAll('[name="format"]').forEach(r=>r.addEventListener('change',updateFormat));updateFormat();
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Melbourne',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());document.querySelector('#preferred-date').min=today;
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const session=form.elements.session.selectedOptions[0].textContent;const rows=[['Name',data.get('name')],['Email',data.get('email')],['Session',session],['Format',data.get('format')],['Preferred date',data.get('date')||'To be discussed'],['Enquiry for',data.get('person')]];if(data.get('format')!=='Online')rows.push(['Suburb',data.get('suburb')]);const serviceNames={early:'Early communication',speech:'Speech & language',aac:'Social communication & AAC',adult:'Adult communication'};if(serviceNames[params.get('service')])rows.push(['Service',serviceNames[params.get('service')]]);const summary=document.querySelector('#summary');summary.replaceChildren();rows.forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;summary.append(dt,dd)});const body='Hello Alea,\n\nI would like to enquire about an appointment.\n\n'+rows.map(([k,v])=>`${k}: ${v}`).join('\n')+'\n\nPlease let me know about availability, confirmed fees and next steps. I understand this is not a confirmed booking.\n\nThank you.';document.querySelector('#email-draft').href='mailto:toledoalea.slp@gmail.com?subject='+encodeURIComponent('ACT Hope Clinic — appointment enquiry')+'&body='+encodeURIComponent(body);form.hidden=true;document.querySelector('#review').hidden=false;document.querySelector('#review').focus()});
document.querySelector('#edit-enquiry').addEventListener('click',()=>{form.hidden=false;document.querySelector('#review').hidden=true;form.elements.name.focus()});
}
