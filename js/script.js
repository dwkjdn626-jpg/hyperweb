// Año actual
document.getElementById('year')?.textContent = new Date().getFullYear();

// ====== Scroll To Top ======
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) toTop?.classList.add('show');
    else toTop?.classList.remove('show');
});

// ====== Reveal Animations ======
const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    }
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ====== Theme Toggle ======
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

if (saved === 'light') root.classList.add('light');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        root.classList.toggle('light');
        localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });
}

// ====== Active Nav Link ======
const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
});

// ====== Form Mock ======
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form && msg) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.textContent = '✅ ¡Gracias! Responderemos hoy mismo.';
    });
}

// ====== Inline Edit Mode ======
const editBtn = document.getElementById('editToggle');
const hint = document.createElement('div');
hint.className = 'edit-hint';
hint.textContent = 'Modo edición activo: haz clic en títulos y textos para personalizar.';
document.body.appendChild(hint);

function loadEdits() {
    document.querySelectorAll('[data-edit]').forEach(el => {
        const key = el.getAttribute('data-edit');
        const v = localStorage.getItem('edit:' + key);
        if (v) el.innerHTML = v;
    });
}

function setEditable(state) {
    document.querySelectorAll('[data-edit]').forEach(el => el.setAttribute('contenteditable', state ? 'true' : 'false'));
    document.body.dataset.editing = state ? 'on' : 'off';
    hint.style.display = state ? 'block' : 'none';
}

function saveEdit(e) {
    const el = e.target;
    if (!el.hasAttribute('data-edit')) return;
    localStorage.setItem('edit:' + el.getAttribute('data-edit'), el.innerHTML);
}

loadEdits();
setEditable(false);

if (editBtn) {
    editBtn.addEventListener('click', () => {
        const state = document.body.dataset.editing !== 'on';
        setEditable(state);
    });
    document.addEventListener('input', saveEdit);
}

// ====== Search ======
async function initSearch() {
    const box = document.getElementById('q'); if (!box) return;
    const results = document.getElementById('results');
    const res = await fetch('search-index.json'); const data = await res.json();
    const cards = (items) => items.map(i => `<a class="card" href="${i.url}"><strong>${i.title}</strong><p class="muted">${i.desc}</p></a>`).join('');
    function run(q) {
        q = q.toLowerCase(); if (!q) { results.innerHTML = ''; return; }
        const out = data.filter(i => (i.title + i.desc + i.tags.join(' ')).toLowerCase().includes(q)).slice(0, 24);
        results.innerHTML = '<div class="grid grid-3">' + cards(out) + '</div>';
    }
    box.addEventListener('input', () => run(box.value));
}
initSearch();

// ====== Chat ======
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMsg');
    const chatBody = document.getElementById('chatBody');

    const respuestas = {
        precios: "💵 Nuestros precios varían según el tipo de página:<br>- Básica: $300 - $500<br>- Intermedia: $500 - $1,200<br>- Avanzada: desde $1,200",
        servicios: "⚡ Ofrecemos: páginas web, apps, mockups, e-commerce adaptados a tus necesidades.",
        soporte: "🛠 Soporte técnico: resolución de incidencias y mantenimiento.",
        ubicacion: "📍 Estamos cerca de Metrocentro, San Salvador, El Salvador.",
        contacto: "📞 Contacto: +503 7192 5913 | ✉ info@hyperweb.com",
        nosotros: "👨‍💻 Somos HYPERWEB, especialistas en desarrollo web, apps y tiendas online.",
        objetivos: "🚀 Nuestro objetivo: expandirnos con soluciones digitales de calidad."
    };

    function addMessage(content, sender = 'bot') {
        const div = document.createElement('div');
        div.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
        div.innerHTML = content;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    document.getElementById('openChat')?.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
    });

    document.getElementById('closeChat')?.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    addMessage("👋 Bienvenido a <b>HYPERWEB</b>. ¿En qué podemos ayudarte hoy?");

    function enviarMensaje() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMessage(msg, 'user');

        let respuesta = "🤔 No entendí tu mensaje. Prueba con: precios, servicios, contacto, nosotros.";
        for (let key in respuestas) {
            if (msg.toLowerCase().includes(key)) respuesta = respuestas[key];
        }

        setTimeout(() => addMessage(respuesta, 'bot'), 300);
        chatInput.value = '';
    }

    sendBtn.addEventListener('click', enviarMensaje);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') enviarMensaje(); });
});

