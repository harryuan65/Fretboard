import React from 'react';
import * as freq from './freq.json';
import styles from './App.module.css';

interface StringProps {
  freqs: number[];
}

const play = (freq: number, duration: number) => {
  const context = new AudioContext();
  const gainNode = context.createGain();
  const oscillator = context.createOscillator();
  oscillator.frequency.value = freq;
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(0);
  setTimeout(() => oscillator.stop(), duration);
};

const String = ({ freqs }: StringProps) => {
  return (
    <div className={styles.string}>
      {freqs.map((freq) => (
        <span className={styles.fret} onMouseDown={() => play(freq, 300)}>
          {freq}
        </span>
      ))}
    </div>
  );
};

function App() {
  const { E1, B2, G3, D4, A5, E6 } = freq;
  return (
    <div className="App">
      <String freqs={E1} />
      <String freqs={B2} />
      <String freqs={G3} />
      <String freqs={D4} />
      <String freqs={A5} />
      <String freqs={E6} />
    </div>
  );
}

export default App;
