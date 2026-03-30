import { useCallback } from "react";

// Singleton AudioContext — lazy init
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function playTone(
  frequency: number,
  endFrequency: number,
  duration: number,
  gain: number,
  type: OscillatorType = "sine",
  startTime?: number
) {
  const c = getCtx();
  if (!c) return;

  const t = startTime ?? c.currentTime;
  const osc = c.createOscillator();
  const gainNode = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, t);
  osc.frequency.linearRampToValueAtTime(endFrequency, t + duration);

  gainNode.gain.setValueAtTime(gain, t);
  gainNode.gain.linearRampToValueAtTime(0, t + duration);

  osc.connect(gainNode);
  gainNode.connect(c.destination);

  osc.start(t);
  osc.stop(t + duration + 0.01);
}

export function useSounds() {
  const playClick = useCallback(() => {
    try {
      playTone(800, 400, 0.08, 0.15, "sine");
    } catch {}
  }, []);

  const playScan = useCallback(() => {
    try {
      playTone(200, 600, 0.3, 0.08, "sawtooth");
    } catch {}
  }, []);

  const playTerminalOpen = useCallback(() => {
    try {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      playTone(440, 440, 0.05, 0.1, "sine", now);
      playTone(880, 880, 0.05, 0.1, "sine", now + 0.07);
    } catch {}
  }, []);

  const playSuccess = useCallback(() => {
    try {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      playTone(523, 523, 0.08, 0.12, "sine", now);
      playTone(659, 659, 0.08, 0.12, "sine", now + 0.09);
      playTone(784, 784, 0.08, 0.12, "sine", now + 0.18);
    } catch {}
  }, []);

  return { playClick, playScan, playTerminalOpen, playSuccess };
}
