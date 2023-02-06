import { IFret } from '../../types/IFret';
import Fret from '../Fret';
import styles from './styles.module.css';

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

export default GuitarString;
