console.log("Script running");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ---------------- BACKGROUND ---------------- */

function drawGradient() {
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, "#050816");
  g.addColorStop(0.5, "#1b1f5e");
  g.addColorStop(1, "#ff8dcf");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* ---------------- PARALLAX STARS ---------------- */

const layers = [
  { speed: 0.1, stars: [] },
  { speed: 0.3, stars: [] },
  { speed: 0.6, stars: [] },
];

layers.forEach(layer => {
  for (let i = 0; i < 120; i++) {
    layer.stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
    });
  }
});

function drawParallax() {
  layers.forEach(layer => {
    layer.stars.forEach(s => {
      s.y += layer.speed;
      if (s.y > canvas.height) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fill();
    });
  });
}

/* ---------------- TEXT STARS ---------------- */

const textStars = [];
let reveal = 0;
let phase = 0;
let burstDone = false;
const sparkles = [];

function createText(text, x, y, size) {
  ctx.font = `${size}px cursive`;
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < data.data.length; i += 4) {
    if (data.data[i + 3] > 150 && Math.random() < 0.07) {
      const px = (i / 4) % canvas.width;
      const py = Math.floor(i / 4 / canvas.width);
      textStars.push({ x: px, y: py, a: 0 });
    }
  }
}

/* ---------------- SPARKLE BURST ---------------- */

function sparkleBurst() {
  for (let i = 0; i < 200; i++) {
    sparkles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.52,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 1,
    });
  }
}

/* ---------------- ANIMATION ---------------- */

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGradient();
  drawParallax();

  // Reveal stars
  textStars.forEach((s, i) => {
    if (i < reveal) {
      s.a = Math.min(s.a + 0.05, 1);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    }
  });

  // Glow line
  if (reveal > 10) {
    ctx.beginPath();
    ctx.moveTo(textStars[0].x, textStars[0].y);
    for (let i = 1; i < reveal && i < textStars.length; i++) {
      ctx.lineTo(textStars[i].x, textStars[i].y);
    }
    ctx.strokeStyle = "rgba(255,180,230,0.6)";
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ffd1ec";
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  reveal += phase === 0 ? 1.5 : 2.5;

  // Sparkles
  sparkles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,200,255,${p.life})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

/* ---------------- SEQUENCE ---------------- */

setTimeout(() => {
  createText("Happy Birthday", canvas.width * 0.18, canvas.height * 0.35, 80);
}, 800);

setTimeout(() => {
  phase = 1;
  createText("Karishma", canvas.width * 0.22, canvas.height * 0.52, 120);
}, 3500);

setTimeout(() => {
  if (!burstDone) {
    sparkleBurst();
    burstDone = true;
  }
}, 6500);

animate();
