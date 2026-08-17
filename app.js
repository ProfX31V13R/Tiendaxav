const products=[
  [
    21,
    "Xiaomi Redmi Note 14 Pro+ 5G",
    "Tecnología",
    "20260517_210451.jpg",
    "Smartphone nuevo en caja · consulta capacidad y especificaciones",
    "Destacado"
  ],
  [
    22,
    "Azzaro Forever Wanted",
    "Perfumes",
    "20260721_003352.jpg",
    "Perfume masculino · producto original en caja",
    ""
  ],
  [
    23,
    "Azzaro Wanted",
    "Perfumes",
    "20260721_003421.jpg",
    "Perfume masculino · producto original en caja",
    ""
  ],
  [
    24,
    "Azzaro The Most Wanted",
    "Perfumes",
    "20260721_003433.jpg",
    "Perfume masculino · producto original en caja",
    ""
  ],
  [
    25,
    "Set Azzaro Wanted",
    "Perfumes",
    "20260721_003605.jpg",
    "Estuche con perfume, miniatura y cuidado personal",
    "Set regalo"
  ],
  [
    26,
    "Set Hugo Boss",
    "Perfumes",
    "20260721_003726.jpg",
    "Estuche con perfume y cuidado personal",
    "Set regalo"
  ],
  [
    27,
    "Sofá gris reclinable",
    "Hogar",
    "20260724_125700.jpg",
    "Sofá amplio color gris · varias posiciones · coordinar retiro",
    "Retiro"
  ]
];
const categories=["Todos","Perfumes","Tecnología","Hogar"];let active="Todos";let query="";
const grid=document.querySelector("#product-grid"),count=document.querySelector("#result-count"),empty=document.querySelector("#empty"),filters=document.querySelector("#filters");
const escapeHtml=s=>String(s).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
function drawFilters(){filters.innerHTML=categories.map(c=>`<button class="${c===active?"active":""}" data-category="${c}">${c}</button>`).join("");filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{active=b.dataset.category;drawFilters();render()})}
function render(){const q=query.trim().toLocaleLowerCase("es");const list=products.filter(p=>(active==="Todos"||p[2]===active)&&(!q||`${p[0]} ${p[1]} ${p[4]}`.toLocaleLowerCase("es").includes(q)));count.innerHTML=`Catálogo actualizado. <strong>${list.length} ${list.length===1?"artículo":"artículos"}</strong>.`;grid.hidden=!list.length;empty.hidden=!!list.length;grid.innerHTML=list.map((p,i)=>{const text=encodeURIComponent(`Hola, me interesa el artículo #${p[0]}: ${p[1]}. ¿Sigue disponible y cuál es su precio?`);return `<article class="card" style="--delay:${Math.min(i,11)*35}ms"><div class="card-image"><img src="${p[3]}" alt="${escapeHtml(p[1])}" loading="lazy"><span class="item-number">Item #${p[0]}</span>${p[5]?`<span class="badge">${escapeHtml(p[5])}</span>`:""}</div><div class="card-body"><p class="category">${p[2]}</p><h3>${escapeHtml(p[1])}</h3><p class="details">${escapeHtml(p[4])}</p><div class="card-footer"><span class="price">Consultar precio</span><a class="buy-btn" href="https://wa.me/?text=${text}" target="_blank" rel="noreferrer">Comprar</a></div></div></article>`}).join("")}
function activateCards(){grid.querySelectorAll(".card").forEach(card=>{card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;card.style.setProperty("--mx",`${x}px`);card.style.setProperty("--my",`${y}px`);card.style.setProperty("--rx",`${((y/r.height)-.5)*-4}deg`);card.style.setProperty("--ry",`${((x/r.width)-.5)*4}deg`)});card.addEventListener("pointerleave",()=>{card.style.setProperty("--rx","0deg");card.style.setProperty("--ry","0deg")})})}
document.querySelector("#search").addEventListener("input",e=>{query=e.target.value;render()});drawFilters();render();
