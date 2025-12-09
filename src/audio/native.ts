let context: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!context) {
    context = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return context;
}

type Voice = {
  osc: OscillatorNode;
  gain: GainNode;
};

// One voice per frequency; simple voice-stealing for repeated hits
const voices = new Map<number, Voice>();
let slideVoice: Voice | null = null;

export function toneAttack(freq: number) {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // If same freq is currently playing, release it quickly
  const existing = voices.get(freq);
  if (existing) {
    try {
      existing.gain.gain.cancelScheduledValues(now);
      existing.gain.gain.setValueAtTime(existing.gain.gain.value, now);
      existing.gain.gain.linearRampToValueAtTime(0, now + 0.02);
      existing.osc.stop(now + 0.03);
    } catch {}
    existing.osc.disconnect();
    existing.gain.disconnect();
    voices.delete(freq);
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.005); // short attack
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  voices.set(freq, { osc, gain });
}

export function toneRelease(freq: number) {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const v = voices.get(freq);
  if (!v) return;
  try {
    v.gain.gain.cancelScheduledValues(now);
    v.gain.gain.setValueAtTime(v.gain.gain.value, now);
    v.gain.gain.linearRampToValueAtTime(0, now + 0.08); // short release
    v.osc.stop(now + 0.09);
    v.osc.onended = () => {
      v.osc.disconnect();
      v.gain.disconnect();
    };
  } catch {
    // ignore
  } finally {
    voices.delete(freq);
  }
}

export function slideStart(freq: number) {
  const ctx = getCtx();
  const now = ctx.currentTime;
  // If already sliding, just retune with a quick ramp
  if (slideVoice) {
    slideVoice.osc.frequency.cancelScheduledValues(now);
    slideVoice.osc.frequency.setTargetAtTime(freq, now, 0.02);
    return;
  }
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  slideVoice = { osc, gain };
}

export function slideTo(freq: number) {
  const ctx = getCtx();
  const now = ctx.currentTime;
  if (!slideVoice) {
    // if slide not started (e.g., entered new fret before previous ended), start it here
    slideStart(freq);
    return;
  }
  slideVoice.osc.frequency.cancelScheduledValues(now);
  // short linear slide for feel
  slideVoice.osc.frequency.linearRampToValueAtTime(freq, now + 0.06);
}

export function slideEnd() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  if (!slideVoice) return;
  try {
    slideVoice.gain.gain.cancelScheduledValues(now);
    slideVoice.gain.gain.setValueAtTime(slideVoice.gain.gain.value, now);
    slideVoice.gain.gain.linearRampToValueAtTime(0, now + 0.08);
    slideVoice.osc.stop(now + 0.09);
    slideVoice.osc.onended = () => {
      slideVoice?.osc.disconnect();
      slideVoice?.gain.disconnect();
    };
  } catch {
    // ignore
  } finally {
    slideVoice = null;
  }
}
