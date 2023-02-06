import React from 'react';
import { IFret } from '../../types/IFret';
import { IScaleWithStep } from '../../utils/Scale';
import Fret from '../Fret';
import styles from './styles.module.css';
interface GuitarStringProps {
  frets: IFret[];
  scaleMap: IScaleWithStep | null;
}

const renderFrets = (fret: IFret, scaleMap: IScaleWithStep | null) => {
  const { note, freq } = fret;
  const highlightNote = scaleMap && scaleMap[note];
  if (!highlightNote) {
    return <Fret key={String(freq)} note={note} freq={freq} />;
  }

  const { ord, ordNotation } = highlightNote;
  return (
    <Fret
      key={String(freq)}
      note={note}
      freq={freq}
      ord={ord}
      ordNotation={ordNotation}
    />
  );
};
const GuitarString = ({ frets, scaleMap }: GuitarStringProps) => {
  return (
    <div>
      <div className={styles.stringFrets}>
        {frets.map((fret) => renderFrets(fret, scaleMap))}
      </div>
    </div>
  );
};

export default GuitarString;
