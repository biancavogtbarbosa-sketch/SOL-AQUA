/* ============ ACESSIBILIDADE ============ */
const body = document.body;
let fontScale = 1;

document.getElementById('btnContrast').addEventListener('click', () => {
  body.classList.toggle('high-contrast');
});

document.getElementById('btnDyslexic').addEventListener('click', () => {
  body.classList.toggle('dyslexic');
});

document.getElementById('btnFontUp').addEventListener('click', () => {
  fontScale = Math.min(fontScale + 0.1, 1.6);
  document.documentElement.style.setProperty('--tam-base', fontScale + 'rem');
});

document.getElementById('btnFontDown').addEventListener('click', () => {
  fontScale = Math.max(fontScale - 0.1, 0.8);
  document.documentElement.style.setProperty('--tam-base', fontScale + 'rem');
});

/* ============ SIMULADOR 1 — ABSORÇÃO VS REFLEXÃO ============ */
const canvas1 = document.getElementById('sim1');
const ctx1 = canvas1.getContext('2d');
const colorRange = document.getElementById('colorRange');
const tempOut = document.getElementById('tempOut');

function drawSim1() {
  const v = colorRange.value / 100; // 0 = claro, 1 = escuro
  const r = Math.round(255 * (1 - v));
  const cor = `rgb(${r},${r},${r})`;
  const temp = (25 + v * 20).toFixed(1);

  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  // Sol
  ctx1.fillStyle = '#ffb703';
  ctx1.beginPath();
  ctx1.arc(80, 60, 30, 0, Math.PI * 2);
  ctx1.fill();

  // Raios
  ctx1.strokeStyle = '#fb8500';
  ctx1.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx1.beginPath();
    ctx1.moveTo(100 + i * 10, 90);
    ctx1.lineTo(200 + i * 40, 200);
    ctx1.stroke();
  }

  // Superfície
  ctx1.fillStyle = cor;
  ctx1.fillRect(150, 200, 300, 60);

  // Raios refletidos (quanto mais claro, mais reflexão)
  ctx1.strokeStyle = `rgba(255, 183, 3, ${1 - v})`;
  for (let i = 0; i < 5; i++) {
    ctx1.beginPath();
    ctx1.moveTo(200 + i * 40, 200);
    ctx1.lineTo(250 + i * 30, 120);
    ctx1.stroke();
  }

  tempOut.textContent = `Temperatura: ${temp}°C`;
}
colorRange.addEventListener('input', drawSim1);
drawSim1();

/* ============ SIMULADOR 2 — COBERTURA TRANSPARENTE ============ */
const canvas2 = document.getElementById('sim2');
const ctx2 = canvas2.getContext('2d');
const toggleCover = document.getElementById('toggleCover');
const tempOut2 = document.getElementById('tempOut2');
let coverOn = false;
let temp2 = 25;

function drawSim2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Sol
  ctx2.fillStyle = '#ffb703';
  ctx2.beginPath();
  ctx2.arc(80, 50, 25, 0, Math.PI * 2);
  ctx2.fill();

  // Raios entrando
  ctx2.strokeStyle = '#fb8500';
  for (let i = 0; i < 4; i++) {
    ctx2.beginPath();
    ctx2.moveTo(100 + i * 20, 70);
    ctx2.lineTo(200 + i * 50, 150);
    ctx2.stroke();
  }

  // Cobertura (se ativa)
  if (coverOn) {
    ctx2.fillStyle = 'rgba(142, 202, 230, 0.4)';
    ctx2.fillRect(150, 140, 350, 10);
    ctx2.strokeStyle = '#0a4d8c';
    ctx2.strokeRect(150, 140, 350, 10);
  }

  // Piscina
  ctx2.fillStyle = '#0a4d8c';
  ctx2.fillRect(150, 180, 350, 80);

  // Raios presos (efeito estufa) se cobertura ativa
  if (coverOn) {
    ctx2.strokeStyle = 'rgba(251, 133, 0, 0.6)';
    ctx2.setLineDash([5, 5]);
    for (let i = 0; i < 3; i++) {
      ctx2.beginPath();
      ctx2.moveTo(220 + i * 80, 180);
      ctx2.lineTo(240 + i * 80, 155);
      ctx2.stroke();
    }
    ctx2.setLineDash([]);
  }

  tempOut2.textContent = `${coverOn ? 'Com' : 'Sem'} cobertura: ${temp2.toFixed(1)}°C`;
}

toggleCover.addEventListener('click', () => {
  coverOn = !coverOn;
  toggleCover.setAttribute('aria-pressed', coverOn);
  toggleCover.textContent = coverOn ? 'Desativar cobertura' : 'Ativar cobertura';
});

setInterval(() => {
  if (coverOn) temp2 = Math.min(temp2 + 0.2, 40);
  else temp2 = Math.max(temp2 - 0.1, 25);
  drawSim2();
}, 500);
drawSim2();

/* ============ SENSORES VIRTUAIS ============ */
const ldrVal = document.getElementById('ldrVal');
const tempVal = document.getElementById('tempVal');
document.getElementById('readSensor').addEventListener('click', () => {
  const ldr = Math.floor(Math.random() * 800 + 200); // 200-1000 lux
  const temp = (20 + Math.random() * 15).toFixed(1);
  ldrVal.textContent = ldr;
  tempVal.textContent = temp;
});

/* ============ NAVEGAÇÃO POR TECLADO ============ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.activeElement.blur();
});
