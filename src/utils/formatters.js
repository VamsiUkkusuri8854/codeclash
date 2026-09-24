export const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
export const fmtNum = (n) => Number(n).toLocaleString('en-US');
let ctx;
export const beep = (on, f = 660) => {
  if (!on) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = f; g.gain.value = 0.05; o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.12);
  } catch { /* ignore */ }
};
