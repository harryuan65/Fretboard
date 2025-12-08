import React, { useEffect, useMemo, useState } from 'react';
import { IScale, ScaleName } from '../../utils/Scale';
import { CHROMATIC_NOTES, NoteName } from '../../utils/Notes';
import {
  buildDiatonicChord,
  nameMajorDiatonicTriad,
  ChordTone,
  MAIN_QUALITIES,
  SUB_QUALITIES,
  buildAnyChord,
  MainQuality,
  SubQuality,
} from '../../utils/Chord';
import styles from './styles.module.css';

interface ChordFinderProps {
  scales: IScale[] | null;
  scaleKey?: NoteName | null;
  scaleType?: ScaleName | null;
  onChordChange: (tones: ChordTone[] | null) => void;
}

const ChordFinder: React.FC<ChordFinderProps> = ({ scales, scaleKey, scaleType, onChordChange }) => {
  // Mutual exclusive toggles
  const [enableAny, setEnableAny] = useState<boolean>(false);
  const [enableDiatonic, setEnableDiatonic] = useState<boolean>(false);

  // Any Chord selections
  const [anyBase, setAnyBase] = useState<NoteName>('C');
  const [anyMain, setAnyMain] = useState<MainQuality>('');
  const [anySub, setAnySub] = useState<SubQuality>('');

  // Diatonic selection
  const [selectedDegree, setSelectedDegree] = useState<number | ''>('');

  const diatonicButtons = useMemo(() => {
    if (!scales || scales.length < 7) return [];
    return new Array(7).fill(0).map((_, i) => {
      const label =
        scaleType === 'major'
          ? nameMajorDiatonicTriad(scales, i)
          : scales[i].note.name;
      return { value: i, label };
    });
  }, [scales, scaleType]);

  // Enforce mutual exclusion
  const toggleAny = (checked: boolean) => {
    setEnableAny(checked);
    if (checked) {
      setEnableDiatonic(false);
      setSelectedDegree('');
    }
  };
  const toggleDiatonic = (checked: boolean) => {
    setEnableDiatonic(checked);
    if (checked) {
      setEnableAny(false);
    }
  };

  // Emit chord tones depending on mode
  useEffect(() => {
    if (enableAny) {
      const chord = buildAnyChord(anyBase, anyMain, anySub);
      onChordChange(chord.tones);
      return;
    }
    if (enableDiatonic && scales && selectedDegree !== '') {
      const built = buildDiatonicChord(scales, selectedDegree as number, true);
      onChordChange(built.tones);
      return;
    }
    onChordChange(null);
  }, [enableAny, enableDiatonic, anyBase, anyMain, anySub, scales, selectedDegree, onChordChange]);

  // Toggle behavior for diatonic buttons (single select with toggle off)
  const onClickDiatonic = (value: number) => {
    if (!enableDiatonic) return;
    setSelectedDegree((prev) => (prev === value ? '' : value));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={enableAny}
            onChange={(e) => toggleAny(e.target.checked)}
          />
          Any Chord
        </label>
        <div className={styles.row}>
          <span>Select Chord Base</span>
          <select
            disabled={!enableAny}
            value={anyBase}
            onChange={(e) =>
              setAnyBase((e.target as HTMLSelectElement).value as NoteName)
            }
          >
            {CHROMATIC_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select
            disabled={!enableAny}
            value={anyMain}
            onChange={(e) =>
              setAnyMain((e.target as HTMLSelectElement).value as MainQuality)
            }
          >
            {MAIN_QUALITIES.map((q) => (
              <option key={q} value={q}>
                {q || '(maj)'}
              </option>
            ))}
          </select>
          <select
            disabled={!enableAny}
            value={anySub}
            onChange={(e) =>
              setAnySub((e.target as HTMLSelectElement).value as SubQuality)
            }
          >
            {SUB_QUALITIES.map((q) => (
              <option key={q} value={q}>
                {q || '(none)'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={enableDiatonic}
            onChange={(e) => toggleDiatonic(e.target.checked)}
          />
        Diatonic Chords
        </label>
        {!scales && (
          <div className={styles.hint}>
            Set a KEY/scale first in the Scale tab to see diatonic chords.
          </div>
        )}
        <div className={styles.row}>
          {diatonicButtons.map((btn) => (
            <button
              key={btn.value}
              className={[
                styles.btn,
                enableDiatonic && selectedDegree === btn.value && styles.active,
              ].join(' ')}
              disabled={!enableDiatonic}
              onClick={() => onClickDiatonic(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChordFinder;

