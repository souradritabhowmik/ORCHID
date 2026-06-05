import { Flower } from "./flower";
import { flow } from "./flowfield";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers: Flower[] = [];

for (let i = 0; i < 80; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  const f = flow(x, y, 0);

  flowers.push(
    new Flower(
      x + f * 20,
      y + f * 20
    )
  );
}

let t = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const flower of flowers) {
    flower.draw(ctx, t);
  }

  t += 0.01;
  requestAnimationFrame(animate);
}

animate();
