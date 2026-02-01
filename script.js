const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load background
const bg = new Image();
bg.src = "bg.jpg";

const stars = [];
let revealProgress = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);

// Create star dots along text
function createTextStars(text, x, y, size) {
  ctx.font = `${size}px cursive`;
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] > 150 && Math.random() < 0.08) {
      const px = (i / 4) % canvas.width;
      const py = Math.floor(i / 4 / canvas.width);

      stars.push({
        x: px,
        y: py,
        alpha: 0,
      });
    }
  }
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Stars
  stars.forEach((s, i) => {
    if (i < revealProgress) {
      s.alpha = Math.min(s.alpha + 0.05, 1);

      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    }
  });

  // Glowing reveal line
  if (revealProgress > 1) {
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    for (let i = 1; i < revealProgress && i < stars.length; i++) {
      ctx.lineTo(stars[i].x, stars[i].y);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "white";
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  revealProgress += 2;

  requestAnimationFrame(animate);
}

bg.onload = () => {
  createTextStars("Happy Birthday", canvas.width * 0.18, canvas.height * 0.35, 80);
  createTextStars("Karishma", canvas.width * 0.22, canvas.height * 0.5, 120);
  animate();
};
