window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  // background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#050816");
  gradient.addColorStop(1, "#ff8dcf");

  function draw() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "36px serif";
    ctx.fillText("Happy Birthday", canvas.width / 2, canvas.height * 0.4);

    ctx.font = "64px serif";
    ctx.fillText("Karishma", canvas.width / 2, canvas.height * 0.55);
  }

  draw();
};
