const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let t = 0;

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseRadius = 8 + Math.random() * 18;
    this.petals = 5; // sakura style
    this.phase = Math.random() * Math.PI * 2;

    // subtle drifting
    this.dx = (Math.random() - 0.5) * 0.2;
    this.dy = (Math.random() - 0.5) * 0.2;
  }

  draw(t) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // soft breathing motion
    const pulse = Math.sin(t * 0.6 + this.phase) * 1.5;

    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();

      for (let a = 0; a < Math.PI * 2; a += 0.05) {
        const r =
          this.baseRadius +
          pulse +
          Math.sin(this.petals * a) * (4 + layer * 2);

        const x = r * Math.cos(a);
        const y = r * Math.sin(a);

        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // watercolor layering
      ctx.fillStyle = `rgba(255, 182, 193, ${0.25 - layer * 0.07})`;
      ctx.fill();
    }

    ctx.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < -50) this.x = canvas.width + 50;
    if (this.x > canvas.width + 50) this.x = -50;
    if (this.y < -50) this.y = canvas.height + 50;
    if (this.y > canvas.height + 50) this.y = -50;
  }
}

const flowers = [];

function createCluster(cx, cy, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 80;

    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    flowers.push(new Flower(x, y));
  }
}

// place clusters like a painting (not uniform)
createCluster(canvas.width * 0.3, canvas.height * 0.4, 20);
createCluster(canvas.width * 0.7, canvas.height * 0.6, 25);
createCluster(canvas.width * 0.5, canvas.height * 0.2, 15);

function animate() {
  ctx.fillStyle = "rgba(246, 239, 231, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  flowers.forEach(f => {
    f.update();
    f.draw(t);
  });

  t += 0.01;
  requestAnimationFrame(animate);
}

ctx.fillStyle = "#f6efe7";
ctx.fillRect(0, 0, canvas.width, canvas.height);

animate();
