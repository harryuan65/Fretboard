import { Note, Notes } from './Notes';

type ScaleName = keyof typeof Scale['available'];
type IScaleWithStep = Record<
  Note,
  { ord: number; ordNotation: string; notation: string }
>;

class Scale {
  static available = {
    major: {
      steps: [2, 2, 1, 2, 2, 2, 1],
      notation: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    minor: {
      steps: [2, 1, 2, 2, 1, 2, 2],
      notation: ['1', '2', '♭3', '4', '5', '♭6', '♭7', '8'],
    },
    diminished: {
      steps: [2, 1, 2, 1, 2, 1, 2, 1],
      notation: ['1', '2', '♭3', '4', '♭5', '♭6', '6', '♭7', '8'],
    },
  } as const;

  // see steps.txt
  static intervals = {
    0: '1',
    1: '♭2',
    2: '2',
    3: '♭3',
    4: '3',
    5: '4',
    6: '♯4',
    7: '5',
    8: '♭6',
    9: '6',
    10: '♭7',
    11: '7',
    12: '1',
  } as const;

  key: Note;
  scaleName: ScaleName;
  scalesCalculated: boolean;
  scaleNotesMap: IScaleWithStep;
  scaleNotes: Note[] = [];
  constructor(key: Note, scaleName: ScaleName) {
    this.key = key;
    this.scaleName = scaleName;
    this.scalesCalculated = false;
    this.scaleNotesMap = {
      // initialize with the first note of the key
      [this.key]: {
        ord: 1,
        ordNotation: Scale.intervals[0],
        notation: '1',
      },
    } as IScaleWithStep;
    this.scaleNotes = [this.key];
  }

  calculateList() {
    if (this.scalesCalculated) {
      return this.scaleNotesMap as IScaleWithStep;
    }
    let index = Notes.all.findIndex((note) => note === this.key);

    const scale = Scale.available[this.scaleName];
    const steps = scale.steps;
    for (let i = 0, ord = 2; i < steps.length; i++, ord++) {
      index += steps[i];
      const note = Notes.get(index);
      let intervalDiff = index as keyof typeof Scale['intervals'];
      // Eb: { ord: 3, ordNotation: "b3" }
      // don't overwrite C
      if (!this.scaleNotesMap[note]) {
        this.scaleNotesMap[note] = {
          ord: note === this.key ? 1 : ord,
          ordNotation: Scale.intervals[intervalDiff],
          notation: scale.notation[i + 1],
        };
      }
      this.scaleNotes.push(note); // "Eb"
    }
    this.scalesCalculated = true;
    return this.scaleNotesMap;
  }
}

export { type ScaleName, type IScaleWithStep };
export default Scale;
