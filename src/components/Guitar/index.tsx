import React from 'react';
import freq from '../../contants/freq.json';
import { IFret } from '../../types/IFret';
import Fret from '../Fret';
import styles from './styles.module.css';
import { IScaleWithStep } from '../../utils/ScaleFinder';
interface GuitarProps {
  highlightScale: IScaleWithStep;
}

const Guitar = ({ highlightScale }: GuitarProps) => {
  const strings = freq.strings as IFret[][];
  return (
    <div className={styles.guitar}>
      {strings.map((stringFrets, i) => {
        return (
          <div className={styles.stringLineWrap}>
            <div className={styles.stringNo}>{i + 1}</div>
            <div className={styles.stringFrets}>
              {stringFrets.map(({ note, freq }) => {
                const highlightNote = highlightScale[note];
                if (!highlightNote) {
                  return <Fret key={String(freq)} note={note} freq={freq} />;
                } else {
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
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Guitar;
