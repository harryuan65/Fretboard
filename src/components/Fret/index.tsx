import React, { useEffect, useState } from 'react';
import { IFret } from '../../types/IFret';
import styles from './styles.module.css';

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

export default Fret;
