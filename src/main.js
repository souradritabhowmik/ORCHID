const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10 + Math.random() * 20;
    this.petals = 4 + Math.floor(Math.random() * 4);
    this.phase = Math.random() * Math.PI * 2;
  }

  draw(t) {
    ctx.save();
    ctx.translate(this.x, this.y);

    for (let i = 0; i < this.petals; i++) {
      const angle = (i / this.petals) * Math.PI * 2;
      const pulse = Math.sin(t + this.phase) * 2;

      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        const r = this.radius + pulse + 5 * Math.sin(this.petals * a);

        const px = r * Math.cos(a + angle);
        const py = r * Math.sin(a + angle);

        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.fillStyle = "rgba(255,182,193,0.5)";
      ctx.fill();
    }

    ctx.restore();
  }
}

const flowers = [];

for (let i = 0; i < 80; i++) {
  flowers.push(
    new Flower(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
  );
}

let t = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  flowers.forEach(f => f.draw(t));

  t += 0.02;
  requestAnimationFrame(animate);
}

animate();
