export class Flower {
  x: number;
  y: number;
  radius: number;
  petals: number;
  phase: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 10 + Math.random() * 20;
    this.petals = 4 + Math.floor(Math.random() * 4);
    this.phase = Math.random() * Math.PI * 2;
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    ctx.save();
    ctx.translate(this.x, this.y);

    for (let i = 0; i < this.petals; i++) {
      const angle = (i / this.petals) * Math.PI * 2;

      const pulse = Math.sin(t * 0.8 + this.phase) * 2;

      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        const r =
          this.radius +
          pulse +
          5 * Math.sin(this.petals * a);

        const px = r * Math.cos(a + angle);
        const py = r * Math.sin(a + angle);

        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.fillStyle = "rgba(255, 182, 193, 0.5)";
      ctx.fill();
    }

    ctx.restore();
  }
}
