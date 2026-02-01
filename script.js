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
    g.addColorStop(0, "#050816");
    g.addColorStop(0.5, "#1b1f5e");
    g.addColorStop(1, "#ff8dcf");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ---------- PARALLAX STARS ---------- */
  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      s: Math.random() * 0.4 + 0.1
    });
  }

  function drawStars() {
    stars.forEach(star => {
      star.y += star.s;
      if (star.y > canvas.height) star.y = 0;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();
    });
  }

  /* ---------- TEXT ---------- */
  let alpha = 0;

  function drawText() {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "white";
    ctx.font = "48px cursive";
    ctx.textAlign = "center";
    ctx.fillText("Happy Birthday", canvas.width / 2, canvas.height * 0.4);

    ctx.font = "72px cursive";
    ctx.fillText("Karishma", canvas.width / 2, canvas.height * 0.55);
    ctx.globalAlpha = 1;
  }

  /* ---------- LOOP ---------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawStars();

    if (alpha < 1) alpha += 0.01;
    drawText();

    requestAnimationFrame(animate);
  }

  animate();
};
