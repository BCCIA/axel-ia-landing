// ----------------- SEGURIDAD: PROTECCIÓN POR PIN -----------------
const PIN_CORRECTO = "5703";

function accesoPermitido() {
  return localStorage.getItem("pinAccesoAutorizado") === "true";
}

function solicitarPin() {
  const pinIngresado = prompt("Por favor, introduce el PIN de acceso:");

  if (pinIngresado === PIN_CORRECTO) {
    localStorage.setItem("pinAccesoAutorizado", "true");
  } else {
    alert("PIN incorrecto. No tienes permiso para acceder.");
    document.body.innerHTML = "<h1 style='text-align:center; padding-top:20%; font-family:sans-serif;'>Acceso denegado</h1>";
    throw new Error("PIN incorrecto - ejecución detenida");
  }
}

if (!accesoPermitido()) {
  solicitarPin();
}

// ----------------- SEGURIDAD Y NAVEGACIÓN -----------------

// Deshabilitar clic derecho en la página principal
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Función para deshabilitar combinaciones de teclas (F12, Ctrl+Shift+I, etc.)
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  )
    return false;
};

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

// ----------------- CHAT D-ID -----------------

class DIDChat {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chatUrl =
      "https://studio.d-id.com/agents/share?id=v2_agt_462LtJ9K&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNVEkzT1RreU9EVXdOVGMwTnpNMk9EZzBORE02YjNWQmRsVkJaMFJsWTI5dmRuSTBiV2RxTjAxcg==";
    this.iframe = null;
    this.init();
  }

  init() {
    this.createIframe();
  }

  createIframe() {
    const wrapper = document.createElement("div");
    wrapper.className = "iframe-wrapper";
    this.iframe = document.createElement("iframe");
    this.iframe.className = "did-chat-iframe fade-in";
    this.iframe.src = this.chatUrl;
    this.iframe.allow = "camera;microphone;clipboard-write";
    this.iframe.title = "D-ID Chat Interface";

    wrapper.appendChild(this.iframe);
    this.container.appendChild(wrapper);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chat = new DIDChat("chat-container");
});

// ----------------- GSAP ANIMACIONES -----------------

gsap.to(".first", 1.5, {
  delay: 0.5,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.to(".second", 1.5, {
  delay: 0.7,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.to(".third", 1.5, {
  delay: 0.9,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.from(".home-img", { opacity: 0, duration: 2, delay: 2, x: 60 });

gsap.from(".home-information", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
});

gsap.from(".anime-text", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
  ease: "expo.out",
  stagger: 0.3,
});

gsap.from(".nav-logo", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
});

gsap.from(".nav-item", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});

gsap.from(".home-social", {
  opacity: 0,
  duration: 3,
  delay: 4,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});

// ----------------- REFRESCO AUTOMÁTICO CADA 5 MINUTOS -----------------

function iniciarRefresco() {
  let refreshTimeout;
  let cancelRefresh = false;

  let message = document.getElementById('refresh-message');
  if (!message) {
    message = document.createElement('div');
    message.id = 'refresh-message';
    message.innerText = 'Refrescando...';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(0,0,0,0.8)';
    message.style.color = '#fff';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '24px';
    message.style.zIndex = '9999';
    message.style.display = 'none';
    document.body.appendChild(message);
  }

  function startRefreshSequence() {
    cancelRefresh = false;
    message.style.display = 'block';

    function cancelAction() {
      cancelRefresh = true;
      message.style.display = 'none';
      clearTimeout(refreshTimeout);
      document.removeEventListener('click', cancelAction);
      document.removeEventListener('touchstart', cancelAction);
      setTimeout(startRefreshSequence, 5 * 60 * 1000);
    }

    document.addEventListener('click', cancelAction);
    document.addEventListener('touchstart', cancelAction);

    refreshTimeout = setTimeout(() => {
      if (!cancelRefresh) {
        location.reload();
      }
    }, 5000);
  }

  setTimeout(startRefreshSequence, 5 * 60 * 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refresh-btn");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      location.reload();
    });
  }
});


// ===== Fondo tecnológico: selector de modo (video o network) =====
document.addEventListener("DOMContentLoaded", () => {
  const techBg = document.querySelector(".tech-bg");
  if (!techBg) return;

  const mode = techBg.getAttribute("data-bg"); // "video" | "network"
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Si es video, ocultamos canvas y dejamos que el <video> haga su trabajo.
  if (mode === "video" || prefersReduce) {
    const cv = document.getElementById("net-bg");
    if (cv) cv.style.display = "none";
    return;
  }

  // ====== NETWORK CANVAS (líneas azul neón) ======
  const canvas = document.getElementById("net-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  let w, h, dpr, particles, mouse, raf;
  const P_COUNT = 90;      // nº de puntos
  const LINK_DIST = 150;   // distancia de link
  const MOUSE_PULL = 0.08; // atracción sutil al mouse
  const SPEED = 0.4;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function createParticles() {
    particles = new Array(P_COUNT).fill(0).map(() => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
      r: rand(1.2, 2.4)
    }));
  }

  mouse = { x: w / 2, y: h / 2, active: false };
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  canvas.addEventListener("mouseleave", () => (mouse.active = false));

  function step() {
    ctx.clearRect(0, 0, w, h);

    // Partículas
    for (const p of particles) {
      // Movimiento base
      p.x += p.vx; p.y += p.vy;

      // Rebote en bordes
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Atrae levemente al mouse
      if (mouse.active) {
        p.vx += (mouse.x - p.x) * 0.0003 * MOUSE_PULL;
        p.vy += (mouse.y - p.y) * 0.0003 * MOUSE_PULL;
      }
    }

    // Conexiones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const alpha = 1 - dist / LINK_DIST;
          // Línea azul neón con leve resplandor
          ctx.strokeStyle = `rgba(0, 160, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Puntos
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(150, 210, 255, 0.9)";
      ctx.shadowColor = "rgba(0, 160, 255, 0.8)";
      ctx.shadowBlur = 8;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    raf = requestAnimationFrame(step);
  }

  function init() {
    resize();
    createParticles();
    cancelAnimationFrame(raf);
    step();
  }

  window.addEventListener("resize", () => {
    resize();
    // Reposiciona de forma estable sin “saltar”
    particles.forEach(p => {
      p.x = Math.min(Math.max(p.x, 0), w);
      p.y = Math.min(Math.max(p.y, 0), h);
    });
  });

  init();
});
