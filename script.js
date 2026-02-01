window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- BACKGROUND ---------- */
  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, "#06091f");
    g.addColorStop(0.6, "#20256b");
    g.addColorStop(1, "#ff9bd6");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ---------- STARS ---------- */
  const stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      s: Math.random() * 0.3 + 0.1
    });
  }

  function drawStars() {
    stars.forEach(star => {
      star.y += star.s;
      if (star.y > canvas.height) star.y = 0;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fill();
    });
  }

  /* ---------- TEXT REVEAL ---------- */
  let t = 0;

  function drawText() {
    ctx.save();
    ctx.textAlign = "center";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ffd1ec";
    ctx.fillStyle = "white";

    if (t > 60) {
      ctx.globalAlpha = Math.min((t - 60) / 80, 1);
      ctx.font = "42px cursive";
      ctx.fillText("Happy Birthday", canvas.width / 2, canvas.height * 0.4);
    }

    if (t > 160) {
      ctx.globalAlpha = Math.min((t - 160) / 80, 1);
      ctx.font = "68px cursive";
      ctx.fillText("Karishma", canvas.width / 2, canvas.height * 0.55);
    }

    ctx.restore();
  }

  /* ---------- SPARKLE BURST ---------- */
  const sparkles = [];

  function burst() {
    for (let i = 0; i < 120; i++) {
      sparkles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.55,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1
      });
    }
  }

  function drawSparkles() {
    sparkles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,200,255,${p.life})`;
      ctx.fill();
    });
  }

  /* ---------- LOOP ---------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawStars();
    drawText();
    drawSparkles();

    if (t === 260) burst();
    t++;

    requestAnimationFrame(animate);
  }

  animate();
};
