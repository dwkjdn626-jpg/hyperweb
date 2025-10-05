const toggle = document.getElementById('whatsappToggle');
const chat = document.getElementById('whatsappChat');
const input = document.getElementById('whatsappInput');
const sendBtn = document.getElementById('whatsappSend');
const body = document.getElementById('whatsappBody');

const respuestas = {
  precios: "💵 Nuestros precios varían según el tipo de página.",
  servicios: "⚡ Ofrecemos: páginas web, apps, e-commerce adaptados a tus necesidades.",
  contacto: "📞 Contacto: +503 7192 5913 | ✉ info@hyperweb.com",
  ubicacion: "📍 Estamos cerca de Metrocentro, San Salvador, El Salvador.",
  nosotros: "👨‍💻 Somos Hyperweb, especialistas en desarrollo web, apps y tiendas online."
};

// Abrir/ocultar chat
toggle.addEventListener('click', (e) => {
  chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
  e.stopPropagation(); // evita que el click cierre inmediatamente
});

// Cerrar chat si se hace click fuera
document.addEventListener('click', (e) => {
  if (!chat.contains(e.target) && e.target !== toggle) {
    chat.style.display = 'none';
  }
});

// Enviar mensaje
function enviarMensaje(){
  const msg = input.value.trim();
  if(!msg) return;

  const userDiv = document.createElement('div');
  userDiv.className = 'user-msg';
  userDiv.textContent = msg;
  body.appendChild(userDiv);

  let respuesta = "🤔 No entendí tu mensaje. Prueba con: precios, servicios, contacto, nosotros, ubicacion.";
  for(let key in respuestas){
    if(msg.toLowerCase().includes(key)) respuesta = respuestas[key];
  }

  const botDiv = document.createElement('div');
  botDiv.className = 'bot-msg';
  botDiv.innerHTML = respuesta;
  body.appendChild(botDiv);

  body.scrollTop = body.scrollHeight;
  input.value = '';
}

sendBtn.addEventListener('click', enviarMensaje);
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') enviarMensaje(); });
