const header=document.querySelector('#header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

function sendWhatsApp(form, mode){
  const data=Object.fromEntries(new FormData(form).entries());
  const phone='5585996044089';
  let msg='';
  if(mode==='event'){
    msg=`Olá, gostaria de solicitar um orçamento para evento no Grand Parrilla.%0A%0A`+
    `Nome: ${data.nome}%0ATelefone: ${data.telefone}%0ATipo de evento: ${data.tipo}%0AQuantidade de pessoas: ${data.pessoas}%0AData desejada: ${data.data || 'A definir'}%0AHorário: ${data.hora || 'A definir'}%0ADetalhes: ${data.obs || 'Nenhum'}`;
  }else{
    msg=`Olá, gostaria de fazer uma reserva no Grand Parrilla.%0A%0A`+
    `Nome: ${data.nome}%0ATelefone: ${data.telefone}%0AData: ${data.data}%0AHorário: ${data.hora}%0AQuantidade de pessoas: ${data.pessoas}%0ATipo de reserva: ${data.tipo}%0AObservação: ${data.obs || 'Nenhuma'}`;
  }
  window.open(`https://wa.me/${phone}?text=${msg}`,'_blank');
}

document.querySelector('#reserveForm')?.addEventListener('submit',e=>{e.preventDefault();sendWhatsApp(e.currentTarget,'reserve')});
document.querySelector('#eventForm')?.addEventListener('submit',e=>{e.preventDefault();sendWhatsApp(e.currentTarget,'event')});
