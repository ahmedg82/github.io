(() => {
  const menu = document.querySelector('.compact-nav');
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) menu.open = false;
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });

  const figure = document.querySelector('.signal');
  const canvas = figure.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const control = figure.querySelector('button');
  const label = control.querySelector('.motion-label');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const width = 750;
  const height = 500;
  const slices = 76;
  const steps = 114;
  const envelope = Array.from({length: steps + 1}, (_, n) => Math.sin(Math.PI * n / steps) ** 0.85);
  let paused = reduced.matches;
  let visible = true;
  let frame = 0;
  let previousTime = 0;
  let phase = 0;
  let ink;

  // Draw successive cross-sections from the far ridge towards the viewer.
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const drift = Math.sin(phase * .35);
    const sway = Math.sin(phase * .46);
    for (let row = 0; row <= slices; row++) {
      const v = row / slices;
      const center = .48 + .17 * Math.sin(4.7 * v - .5 + drift * .54);
      const crest = 150 + 54 * Math.sin(v * 5 + .5 + sway * .6);
      const ridgeWidth = .125 + .042 * Math.sin(v * 4 + .3);
      const front = 245 + 182 * v;
      const left = 13 + 117 * v;
      ctx.beginPath();
      for (let col = 0; col <= steps; col++) {
        const u = col / steps;
        const peak = Math.exp(-(((u - center) / ridgeWidth) ** 2));
        const shoulder = 80 * Math.exp(-(((u - .26 - .10 * Math.cos(v * 4)) / .17) ** 2));
        const ripple = 23 * Math.sin(10 * u + 4 * v + sway * .5);
        const x = left + 600 * u;
        const y = front - 40 * u - envelope[col] * (crest * peak + shoulder + ripple);
        if (col === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ink;
      ctx.lineWidth = .85 + .65 * v;
      ctx.stroke();
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * density));
    canvas.height = Math.max(1, Math.round(bounds.height * density));
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    ink = ctx.createLinearGradient(18, 280, 735, 155);
    ink.addColorStop(0, '#3052bd');
    ink.addColorStop(.25, '#426bff');
    ink.addColorStop(.43, '#83bcff');
    ink.addColorStop(.57, '#d2e9ff');
    ink.addColorStop(.73, '#769eff');
    ink.addColorStop(1, '#515bd9');
    draw();
  }

  function tick(now) {
    if (!previousTime) previousTime = now;
    const elapsed = now - previousTime;
    if (elapsed >= 1000 / 30) {
      phase += Math.min(elapsed, 100) / 1000;
      previousTime = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    previousTime = 0;
    control.dataset.paused = String(paused);
    label.textContent = paused ? 'Play motion' : 'Pause motion';
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  resize();
  figure.querySelector('.field-still').hidden = true;
  control.hidden = false;
  control.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(figure);
  }
  sync();
})();
