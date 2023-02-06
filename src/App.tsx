import React, { useEffect, useState } from 'react';
import * as freq from './freq.json';
import styles from './App.module.css';

interface IFret {
  note: string;
  freq: number;
}

interface FretProps extends IFret {}

const Fret = ({ note, freq }: FretProps) => {
  const [holding, setHolding] = useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (holding && !playing) {
      const context = new AudioContext();
      const gainNode = context.createGain();
      const oscillator = context.createOscillator();
      oscillator.frequency.value = freq;
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      setOscillator(oscillator);
      oscillator?.start(0);
      setPlaying(true);
    } else if (!holding && playing) {
      oscillator?.stop();
      setPlaying(false);
    }
  }, [freq, oscillator, holding, playing]);

  const hold = () => {
    if (!holding) {
      setHolding(true);
    }
  };

  const release = () => {
    setHolding(false);
  };

  return (
    <span className={styles.fret} onMouseDown={hold} onMouseUp={release}>
      {note}
    </span>
  );
};

interface GuitarStringProps {
  frets: IFret[];
}

const GuitarString = ({ frets }: GuitarStringProps) => {
  return (
    <div className={styles.string}>
      {frets.map(({ note, freq }) => (
        <Fret key={String(freq)} note={note} freq={freq} />
      ))}
    </div>
  );
};

function App() {
  const { string1, string2, string3, string4, string5, string6 } = freq;
  return (
    <div className="App">
      <GuitarString frets={string1} />
      <GuitarString frets={string2} />
      <GuitarString frets={string3} />
      <GuitarString frets={string4} />
      <GuitarString frets={string5} />
      <GuitarString frets={string6} />
    </div>
  );
}

export default App;
